import { XandeumPNode } from '@/types/xandeum';
import { generateMockData } from './mockData';

// Gunakan variabel lingkungan untuk mendapatkan URL dasar API internal
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  (typeof window === 'undefined' ? '' : 'http://localhost:3000');

interface FetchNodesOptions {}

/**
 * Fungsi untuk mengambil data pNode dari API internal.
 * Fungsi ini dimaksudkan untuk digunakan di sisi server (Server Component atau API Route lain).
 * @param options Opsi untuk mengatur pengambilan data (jika diperlukan)
 * @returns Promise yang berisi array XandeumPNode
 */
export async function fetchPNodes(options: FetchNodesOptions = {}): Promise<XandeumPNode[]> {
  try {
    // Gunakan new URL untuk membuat URL absolut, menghindari masalah parsing di Turbopack
    const url = new URL('/api/nodes', API_BASE_URL);

    console.log('DEBUG: Fetching nodes from internal API:', url.toString());

    const fetchUrl = url.toString();

// Untuk development, tetap pakai POST
// Untuk production/build, bisa pakai GET atau handle berbeda
const response = await fetch(fetchUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});

  if (!response.ok) {
    // Saat build, return mock data
    if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') {
      console.log('Using mock data during build');
      return generateMockData();
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

    if (!response.ok) {
      // Jika API route mengembalikan error, tangani di sini
      // Coba ambil teks/JSON dari response untuk informasi error lebih lengkap
      let errorText = '';
      try {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error from API route' }));
          errorText = errorData.error || errorData.message || JSON.stringify(errorData);
        } else {
          errorText = await response.text().catch(() => 'Unknown error from API route');
        }
      } catch (e) {
        errorText = 'Unknown error while parsing error response';
      }

      const errorMessage = `${errorText} (status: ${response.status})`;
      console.error('FETCH NODES ERROR (from /api/nodes):', errorMessage);
      // Lempar error agar bisa ditangani oleh caller
      throw new Error(errorMessage);
    }

    const nodes: XandeumPNode[] = await response.json();
    console.log('DEBUG: Successfully fetched nodes from internal API:', nodes.length);
    return nodes;
  } catch (error) {
    console.error('LIB ERROR: Failed to fetch pNodes from internal service:', error);
    // Lempar error agar bisa ditangani oleh caller (misalnya di getServerSideProps, useEffect, atau component)
    // Kita bisa kembalikan array kosong sebagai fallback jika diinginkan, tapi biasanya lebih baik melempar error
    // untuk memberi tahu bahwa ada masalah.
    throw error; // Atau return [] jika Anda ingin frontend tetap berjalan meski tanpa data.
  }
}