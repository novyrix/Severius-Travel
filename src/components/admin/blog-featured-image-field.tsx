'use client';

import { useRef, useState } from 'react';
import { Loader2, Trash2, Upload } from 'lucide-react';
import { uploadBlogImageFromClient } from '@/lib/blog-image-upload-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BlogFeaturedImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ACCEPTED_IMAGE_TYPES = '.jpg,.jpeg,.png,.webp';

export function BlogFeaturedImageField({ value, onChange, disabled = false }: BlogFeaturedImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      const blob = await uploadBlogImageFromClient(file, 'featured');
      onChange(blob.url);
    } catch (error) {
      console.error('Error uploading featured image:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-2 md:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label htmlFor="featuredImage">Featured Image</Label>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            className="hidden"
            onChange={handleUpload}
            disabled={disabled || isUploading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange('')}
              disabled={disabled || isUploading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <Input
        id="featuredImage"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/uploads/blog/2026/04/post-image.jpg or https://..."
        className="font-mono text-sm"
        disabled={disabled || isUploading}
      />

      <p className="text-xs text-neutral-500">
        Upload a JPG, PNG, or WebP image up to 10MB, or paste an image URL/path manually.
      </p>

      {uploadError && (
        <p className="text-sm text-red-600">{uploadError}</p>
      )}

      {value && (
        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Featured image preview</p>
          <div className="overflow-hidden rounded-lg border">
            <img
              src={value}
              alt="Featured image preview"
              className="h-48 w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23ddd" width="400" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}