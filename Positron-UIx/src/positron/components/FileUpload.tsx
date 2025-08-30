import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, FileText, Image, Film, Music, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Progress } from './Progress';

export interface FileUploadFile {
  file: File;
  id: string;
  progress?: number;
  error?: string;
  preview?: string;
}

export interface FileUploadProps {
  onFilesChange?: (files: FileUploadFile[]) => void;
  onFileRemove?: (fileId: string) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  variant?: 'default' | 'brutal';
  size?: 'sm' | 'md' | 'lg';
  showPreview?: boolean;
  dragAndDrop?: boolean;
  className?: string;
}

const getFileIcon = (file: File) => {
  const type = file.type;
  if (type.startsWith('image/')) return <Image className="w-6 h-6" />;
  if (type.startsWith('video/')) return <Film className="w-6 h-6" />;
  if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
  if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return <Archive className="w-6 h-6" />;
  return <FileText className="w-6 h-6" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  onFileRemove,
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  variant = 'default',
  size = 'md',
  showPreview = true,
  dragAndDrop = true,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUploadFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const sizeVariants = {
    sm: 'p-4 text-sm',
    md: 'p-6 text-base',
    lg: 'p-8 text-lg',
  };

  const validateFile = (file: File): string | undefined => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }
    return undefined;
  };

  const createFileUploadFile = useCallback((file: File): FileUploadFile => {
    const fileUploadFile: FileUploadFile = {
      file,
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      progress: 0,
      error: validateFile(file),
    };

    // Create preview for images
    if (showPreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles(prev => prev.map(f => 
          f.id === fileUploadFile.id 
            ? { ...f, preview: e.target?.result as string }
            : f
        ));
      };
      reader.readAsDataURL(file);
    }

    return fileUploadFile;
  }, [maxSize, showPreview]);

  const handleFilesSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return;

    const newFiles = Array.from(selectedFiles).slice(0, maxFiles - files.length);
    const fileUploadFiles = newFiles.map(createFileUploadFile);
    
    const updatedFiles = [...files, ...fileUploadFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  }, [files, maxFiles, disabled, createFileUploadFile, onFilesChange]);

  const handleFileRemove = useCallback((fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFileRemove?.(fileId);
    onFilesChange?.(updatedFiles);
  }, [files, onFileRemove, onFilesChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && dragAndDrop) {
      setDragOver(true);
    }
  }, [disabled, dragAndDrop]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (!disabled && dragAndDrop) {
      handleFilesSelect(e.dataTransfer.files);
    }
  }, [disabled, dragAndDrop, handleFilesSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded transition-all cursor-pointer',
          'hover:shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px]',
          sizeVariants[size],
          variant === 'brutal' && 'rotate-1 hover:rotate-0',
          dragOver
            ? 'border-sky-500 bg-sky-50'
            : 'border-neutral-300 hover:border-black bg-white',
          disabled && 'opacity-50 cursor-not-allowed hover:shadow-none hover:translate-x-0 hover:translate-y-0'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className={cn(
            'w-16 h-16 bg-neutral-100 border-2 border-black rounded-full flex items-center justify-center',
            variant === 'brutal' && 'rotate-12',
            dragOver && 'bg-sky-100 scale-110'
          )}>
            <Upload className={cn(
              'w-8 h-8 text-neutral-600',
              dragOver && 'text-sky-600'
            )} />
          </div>

          <div className="space-y-2">
            <h3 className="font-black font-mono text-lg text-neutral-900">
              {dragOver ? 'Drop files here' : 'Upload Files'}
            </h3>
            <p className="font-mono text-neutral-600">
              {dragAndDrop ? 'Drag and drop files here, or click to browse' : 'Click to browse files'}
            </p>
            {maxSize && (
              <p className="font-mono text-sm text-neutral-500">
                Max file size: {formatFileSize(maxSize)}
              </p>
            )}
          </div>

          <Button
            variant="solid"
            color="primary"
            size={size}
            disabled={disabled}
            className={variant === 'brutal' ? 'rotate-2' : ''}
          >
            Choose Files
          </Button>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((fileUpload) => (
              <motion.div
                key={fileUpload.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(
                  'p-4 bg-white border-2 border-black rounded flex items-center gap-4',
                  'shadow-[2px_2px_0px_0px_#000000]',
                  variant === 'brutal' && 'rotate-1',
                  fileUpload.error && 'border-red-500 bg-red-50'
                )}
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {fileUpload.preview ? (
                    <img
                      src={fileUpload.preview}
                      alt={fileUpload.file.name}
                      className="w-12 h-12 object-cover rounded border-2 border-black"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-neutral-100 border-2 border-black rounded flex items-center justify-center">
                      {getFileIcon(fileUpload.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-mono font-bold text-neutral-900 truncate">
                    {fileUpload.file.name}
                  </h4>
                  <p className="font-mono text-sm text-neutral-600">
                    {formatFileSize(fileUpload.file.size)}
                  </p>
                  {fileUpload.error && (
                    <p className="font-mono text-sm text-red-600 font-medium">
                      {fileUpload.error}
                    </p>
                  )}
                  {fileUpload.progress !== undefined && fileUpload.progress > 0 && (
                    <div className="mt-2">
                      <Progress 
                        value={fileUpload.progress} 
                        size="sm"
                        color={fileUpload.error ? 'error' : 'success'}
                      />
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  size="sm"
                  variant="outline"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileRemove(fileUpload.id);
                  }}
                  className={variant === 'brutal' ? 'rotate-2' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Count */}
      {files.length > 0 && (
        <div className="flex justify-between items-center font-mono text-sm text-neutral-600">
          <span>{files.length} file{files.length !== 1 ? 's' : ''} selected</span>
          {maxFiles && (
            <span>{files.length} / {maxFiles} max</span>
          )}
        </div>
      )}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';
