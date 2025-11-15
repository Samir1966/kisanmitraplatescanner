
import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  imagePreviewUrl: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, imagePreviewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    onFileSelect(file);
  }, [onFileSelect]);


  return (
    <div>
      <label
        htmlFor="file-upload"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative block w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-300
        ${isDragging 
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
        }`}
      >
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Plant preview" className="mx-auto max-h-64 rounded-md object-contain" />
        ) : (
          <div className="space-y-2 text-gray-500 dark:text-gray-400">
            <UploadCloud className="mx-auto h-12 w-12" />
            <span className="block font-semibold text-green-700 dark:text-green-400">Click to upload or drag and drop</span>
            <span className="block text-sm">PNG, JPG, or WEBP</span>
          </div>
        )}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
