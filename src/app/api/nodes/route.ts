import { NextRequest } from 'next/server';

// Force this route to run in the Node.js runtime so server-side fetch can reach arbitrary ports
export const runtime = 'nodejs';
import http from 'node:http';
import https from 'node:https';
import { PNodeRpcResponse, XandeumPNode } from '@/types/xandeum';

// Fungsi helper untuk membuat request JSON-RPC
const makeRpcRequest = (method: string, params: any = {}, id: string = '1') => {
  return {
    jsonrpc: '2.0',
    id,
    method,
    params,
  };
};

// Handler untuk GET request (hanya untuk dokumentasi atau error)
async function GET(request: NextRequest) {
  return new Response(
    JSON.stringify({ error: 'Method not allowed. Use POST to fetch node data.' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}

// Handler untuk POST request
async function POST(request: NextRequest) {
  try {
    const rawPnodeUrl = process.env.PNODE_RPC_URL;

    if (!rawPnodeUrl) {
      console.error('ENV ERROR: PNODE_RPC_URL is not set in environment variables.');
      return new Response(
        JSON.stringify({ error: 'Server misconfiguration: PNODE_RPC_URL is missing.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- VALIDASI & SANITASI URL ---
    // Trim whitespace/newlines which sometimes sneak in from env files
    const sanitizedRaw = String(rawPnodeUrl).trim();

    let validatedPnodeUrl: URL;
    try {
      validatedPnodeUrl = new URL(sanitizedRaw);
    } catch (urlError) {
      console.error('URL VALIDATION ERROR:', (urlError as Error).message, 'Raw URL:', rawPnodeUrl);
      return new Response(
        JSON.stringify({ error: `Invalid PNODE_RPC_URL format: ${(urlError as Error).message}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Allow only http or https schemes
    if (!['http:', 'https:'].includes(validatedPnodeUrl.protocol)) {
      console.error('URL PROTOCOL ERROR: Unsupported protocol', validatedPnodeUrl.protocol);
      return new Response(
        JSON.stringify({ error: `Unsupported protocol: ${validatedPnodeUrl.protocol}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate port if present
    if (validatedPnodeUrl.port) {
      if (!/^[0-9]+$/.test(validatedPnodeUrl.port)) {
        console.error('URL PORT ERROR: Non-numeric port', validatedPnodeUrl.port);
        return new Response(
          JSON.stringify({ error: `Invalid port in PNODE_RPC_URL: ${validatedPnodeUrl.port}` }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const portNum = Number(validatedPnodeUrl.port);
      if (portNum <= 0 || portNum > 65535) {
        console.error('URL PORT ERROR: Port out of range', validatedPnodeUrl.port);
        return new Response(
          JSON.stringify({ error: `Port out of range in PNODE_RPC_URL: ${validatedPnodeUrl.port}` }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('DEBUG: Attempting to fetch data from pNode RPC:', validatedPnodeUrl.toString());

    // Membuat request JSON-RPC untuk mendapatkan informasi pods
    const rpcRequest = makeRpcRequest('get-pods-with-stats');

    const timeoutMs = 15000;

    // Perform the POST using Node's http/https to avoid possible undici/fetch issues
    const doPost = (url: URL, bodyObj: any) => {
      return new Promise<{ statusCode: number | null; headers: any; body: string }>((resolve, reject) => {
        const isHttps = url.protocol === 'https:';
        const lib = isHttps ? https : http;

        const payload = JSON.stringify(bodyObj);

        const opts: any = {
          hostname: url.hostname,
          port: url.port || (isHttps ? 443 : 80),
          path: url.pathname + (url.search || ''),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: timeoutMs,
        };

        const req = lib.request(opts, (cres) => {
          let data = '';
          cres.setEncoding('utf8');
          cres.on('data', (chunk) => (data += chunk));
          cres.on('end', () => resolve({ statusCode: cres.statusCode || null, headers: cres.headers, body: data }));
        });

        req.on('error', (err) => reject(err));
        req.on('timeout', () => {
          req.destroy(new Error('timeout'));
        });

        req.write(payload);
        req.end();
      });
    };

    let res;
    try {
      res = await doPost(validatedPnodeUrl, rpcRequest);
    } catch (fetchErr: any) {
      // Tangkap kesalahan fetch yang mungkin membawa cause (mis. bad port)
      console.error('FETCH ERROR: Failed to perform fetch to pRPC:', fetchErr?.message || fetchErr);
      console.error('FETCH ERROR NAME:', fetchErr?.name || 'N/A');
      console.error('FETCH ERROR CAUSE:', fetchErr?.cause || 'no cause');
      console.error('SANITIZED RAW URL:', sanitizedRaw);
      console.error('VALIDATED URL (if parsed):', validatedPnodeUrl?.toString ? validatedPnodeUrl.toString() : 'N/A');

      return new Response(
        JSON.stringify({
          error: `Network error while fetching from pRPC: ${fetchErr?.message || 'fetch failed'}`,
          debug: {
            fetchErrorName: fetchErr?.name || null,
            fetchErrorCause: String(fetchErr?.cause || null),
            sanitizedRaw,
            validatedUrl: validatedPnodeUrl?.toString ? validatedPnodeUrl.toString() : null,
          }
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!res || (res.statusCode && res.statusCode >= 400)) {
      console.error(`pRPC request failed with status ${res?.statusCode}`);
      const bodyText = res?.body || '';
      return new Response(
        JSON.stringify({ error: `pRPC request failed with status ${res?.statusCode}`, body: bodyText }),
        { status: res?.statusCode || 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let data: PNodeRpcResponse;
    try {
      data = JSON.parse(res.body);
    } catch (e) {
      console.error('pRPC response JSON parse error', e);
      return new Response(JSON.stringify({ error: 'Failed to parse pRPC JSON response' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    if (data.error) {
      console.error('pRPC returned an error object:', data.error);
      return new Response(
        JSON.stringify({ error: `pRPC error: ${data.error.message || 'Unknown error'}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- PROSES DATA ---
    // Ambil array pods dari data.result.pods
    const pods = data.result?.pods || [];
    console.log('DEBUG: Received pods from pRPC:', pods.length);

    // Validasi dan transformasi data ke bentuk XandeumPNode
    const validatedNodes: XandeumPNode[] = pods.map((pod: any) => ({
      pubkey: pod.pubkey || 'N/A',
      ip: pod.address ? pod.address.split(':')[0] : 'N/A',
      port: pod.rpc_port || 0,
      version: pod.version || 'N/A',
      lastVote: pod.last_seen_timestamp,
      // Asumsikan is_public=true berarti active, selain itu inactive
      status: pod.is_public ? 'active' : 'inactive',
      uptime: pod.uptime,
      // Field berikut tidak ada di respons pRPC, jadi gunakan undefined
      blocksProduced: undefined,
      latency: undefined,
      location: undefined,
    }));

    console.log('DEBUG: Mapped nodes for frontend:', validatedNodes.length);

    return new Response(JSON.stringify(validatedNodes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    // Tangani error fetch atau timeout
    if (error.name === 'AbortError') {
      console.error('FETCH ERROR: Request to pRPC timed out.');
      return new Response(
        JSON.stringify({ error: 'Request to pRPC timed out after 15 seconds.' }),
        { status: 408, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Tangani error jaringan lainnya (termasuk 'bad port')
    console.error('FETCH ERROR: An unexpected error occurred while fetching data from pRPC:', error?.message || error);
    console.error('FETCH ERROR DETAILS:', error?.cause || 'No specific cause provided.');
    return new Response(
      JSON.stringify({ error: `Network error while fetching from pRPC: ${error?.message || 'Unknown error'}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Ekspor handler untuk method yang relevan
export { GET, POST };