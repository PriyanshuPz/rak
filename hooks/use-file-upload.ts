import { useState } from "react";

interface UseFileUploadConfig {
  maxSize?: number;
  acceptedTypes?: string[];
}

interface UseFileUploadReturn {
  filePreview: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: React.DragEvent) => void;
  handleDragOver: (event: React.DragEvent) => void;
  clearFile: () => void;
  error: string | null;
}

export const useFileUpload = (
  onFileSelect: (file: File) => void,
  config: UseFileUploadConfig = {}
): UseFileUploadReturn => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (config.maxSize && file.size > config.maxSize * 1024 * 1024) {
      setError(`File size should be less than ${config.maxSize}MB`);
      return false;
    }

    if (config.acceptedTypes && !config.acceptedTypes.includes(file.type)) {
      setError(`File type must be ${config.acceptedTypes.join(" or ")}`);
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target?.result as string);
      onFileSelect(file);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const clearFile = () => {
    setFilePreview(null);
    setError(null);
  };

  return {
    filePreview,
    handleFileChange,
    handleDrop,
    handleDragOver,
    clearFile,
    error,
  };
};
