'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  tourId: string;
  existingImages?: Array<{ id: number; url: string; order: number }>;
  onUploadComplete?: () => void;
}

export function TourImageUpload({ tourId, existingImages = [], onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(existingImages);
  const [uploadProgress, setUploadProgress] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      setUploadProgress(`Uploading ${acceptedFiles.length} image(s)...`);

      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append('images', file);
        });
        formData.append('isCover', 'false');

        const response = await fetch(`/api/admin/tours/${tourId}/images`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Failed to upload images');
          return;
        }

        setUploadProgress('Upload complete!');
        
        // Refresh the page to show new images
        if (onUploadComplete) {
          onUploadComplete();
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images');
      } finally {
        setUploading(false);
        setTimeout(() => setUploadProgress(''), 2000);
      }
    },
    [tourId, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: true,
    disabled: uploading,
  });

  const handleDelete = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/tours/${tourId}/images`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to delete image');
        return;
      }

      // Remove from local state
      setImages(images.filter((img) => img.id !== imageId));
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleSetCover = async (imageUrl: string) => {
    try {
      const formData = new FormData();
      
      // Create a dummy file upload with the URL
      const response = await fetch(`/api/admin/tours/${tourId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverImage: imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to set cover image');
        return;
      }

      alert('Cover image updated!');
    } catch (error) {
      console.error('Error setting cover image:', error);
      alert('Failed to set cover image');
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-[rgb(var(--color-gold))] bg-[rgb(var(--color-gold))]/10'
            : 'border-neutral-300 hover:border-[rgb(var(--color-gold))]'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
        {isDragActive ? (
          <p className="text-[rgb(var(--color-gold))] font-medium">Drop images here...</p>
        ) : (
          <>
            <p className="text-neutral-600 mb-2">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-sm text-neutral-500">
              Supports: JPG, PNG, WebP (max 10MB per file)
            </p>
          </>
        )}
        {uploadProgress && (
          <p className="mt-4 text-[rgb(var(--color-gold))] font-medium">{uploadProgress}</p>
        )}
      </div>

      {/* Existing Images Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group border rounded-lg overflow-hidden bg-neutral-100 aspect-square"
            >
              <Image
                src={image.url}
                alt="Tour image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetCover(image.url)}
                  className="bg-white/90 hover:bg-white"
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Set Cover
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-600/90 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                #{image.order + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="text-center py-8 text-neutral-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 text-neutral-300" />
          <p>No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
