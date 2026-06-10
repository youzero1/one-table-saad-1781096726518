import BasicTable from '@/components/BasicTable';

export default function TablePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Directory</h1>
        <p className="text-gray-500 mb-6">A simple table listing all registered users.</p>
        <BasicTable />
      </div>
    </div>
  );
}
