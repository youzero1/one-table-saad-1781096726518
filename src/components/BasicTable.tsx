import { useState } from 'react';
import clsx from 'clsx';
import { tableData } from '@/lib/data';
import { Row } from '@/types';
import { ChevronUp, ChevronDown } from 'lucide-react';

type SortKey = keyof Row;
type SortDir = 'asc' | 'desc';

export default function BasicTable() {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sorted = [...tableData].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const columns: { key: SortKey; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white uppercase text-xs tracking-wider">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 cursor-pointer select-none hover:bg-indigo-700 transition-colors"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <span className="flex flex-col ml-1">
                      <ChevronUp
                        size={12}
                        className={clsx(
                          sortKey === col.key && sortDir === 'asc'
                            ? 'text-white'
                            : 'text-indigo-300'
                        )}
                      />
                      <ChevronDown
                        size={12}
                        className={clsx(
                          sortKey === col.key && sortDir === 'desc'
                            ? 'text-white'
                            : 'text-indigo-300'
                        )}
                      />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((row, idx) => (
              <tr
                key={row.id}
                className={clsx(
                  'hover:bg-indigo-50 transition-colors',
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <td className="px-6 py-4 font-medium text-gray-500">{row.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{row.name}</td>
                <td className="px-6 py-4">{row.age}</td>
                <td className="px-6 py-4 text-indigo-600">{row.email}</td>
                <td className="px-6 py-4">{row.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                      row.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
        {sorted.length} row{sorted.length !== 1 ? 's' : ''} total
      </div>
    </div>
  );
}
