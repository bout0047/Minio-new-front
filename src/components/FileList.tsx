import React, { useState } from 'react';
import { ArrowLeft, Upload, Tag, Download, Trash2, Eye } from 'lucide-react';
import ImagePreview from './ImagePreview';

interface FileListProps {
  bucketName: string;
  onBack: () => void;
  searchTerm: string;
  selectedTags: string[];
}

const FileList: React.FC<FileListProps> = ({ bucketName, onBack, searchTerm, selectedTags }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const files = [
    {
      name: 'product-catalog.pdf',
      size: '2048',
      tags: ['documents', 'marketing'],
      thumbnail: 'https://images.unsplash.com/photo-1568695269648-58d6a4b61c13?w=50&h=50&fit=crop',
      preview: 'https://images.unsplash.com/photo-1568695269648-58d6a4b61c13'
    },
    {
      name: 'marketing-banner.jpg',
      size: '1024',
      tags: ['images', 'marketing'],
      thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=50&h=50&fit=crop',
      preview: 'https://images.unsplash.com/photo-1557821552-17105176677c'
    },
    {
      name: 'quarterly-report.xlsx',
      size: '512',
      tags: ['reports', 'archive'],
      thumbnail: 'https://images.unsplash.com/photo-1664575198308-3959904fa430?w=50&h=50&fit=crop',
      preview: 'https://images.unsplash.com/photo-1664575198308-3959904fa430'
    },
  ].filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => file.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const isImageFile = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{bucketName}</h2>
        </div>
        <div className="flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Upload className="h-4 w-4 mr-2" />
            Upload File or Folder
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected Files
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size (KB)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-lg object-cover cursor-pointer"
                        src={file.thumbnail}
                        alt=""
                        onClick={() => isImageFile(file.name) && setPreviewImage(file.preview)}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {file.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    {isImageFile(file.name) && (
                      <button
                        onClick={() => setPreviewImage(file.preview)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-500">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Tag className="h-5 w-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {previewImage && (
        <ImagePreview
          src={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
};

export default FileList;