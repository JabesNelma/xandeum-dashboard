'use client';

import { useRouter } from 'next/navigation';

export function RefreshButton() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <button 
      onClick={handleRefresh}
      className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors text-sm font-medium"
    >
      Refresh Data
    </button>
  );
}
