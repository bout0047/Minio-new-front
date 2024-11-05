import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';

interface BucketListProps {
  onSelectBucket: (bucketName: string) => void;
  searchTerm: string;
  selectedTags: string[];
}

const BucketList: React.FC<BucketListProps> = ({ onSelectBucket, searchTerm }) => {
  const buckets = [
    {
      name: 'Marketing Assets',
      created: '2024-03-15',
      access: 'Read/Write',
      usage: 'N/A',
      objects: 'N/A',
    },
    {
      name: 'Customer Data',
      created: '2024-03-14',
      access: 'Read Only',
      usage: 'N/A',
      objects: 'N/A',
    },
    {
      name: 'Operations',
      created: '2024-03-13',
      access: 'Read/Write',
      usage: 'N/A',
      objects: 'N/A',
    },
  ];

  const filteredBuckets = buckets.filter(bucket => 
    bucket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Storage Buckets</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Plus className="h-4 w-4 mr-2" />
          Create New Bucket
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bucket Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Access
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Objects
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBuckets.map((bucket) => (
              <tr key={bucket.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FolderOpen className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{bucket.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bucket.created}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bucket.access === 'Read/Write' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bucket.access}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bucket.usage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bucket.objects}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onSelectBucket(bucket.name)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Files
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BucketList;