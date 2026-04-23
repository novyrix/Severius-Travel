'use client';

import { useRef, useState } from 'react';
import { Loader2, Save, Trash2, Upload } from 'lucide-react';
import { uploadBlogImageFromClient } from '@/lib/blog-image-upload-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BlogGalleryImage {
  id: string;
  url: string;
  pathname: string;
  altText: string | null;
  caption: string | null;
  sortOrder: number;
}

interface BlogGalleryManagerProps {
  postId: string;
  initialImages: BlogGalleryImage[];
}

export function BlogGalleryManager({ postId, initialImages }: BlogGalleryManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [savingImageId, setSavingImageId] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    setIsUploading(true);
    setUploadMessage(`Uploading ${files.length} image(s)...`);

    try {
      const createdImages: BlogGalleryImage[] = [];

      for (const file of files) {
        const blob = await uploadBlogImageFromClient(file, 'gallery');
        const response = await fetch(`/api/admin/blog/${postId}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            images: [
              {
                url: blob.url,
                pathname: blob.pathname,
                altText: '',
                caption: '',
              },
            ],
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to save uploaded image.');
        }

        createdImages.push(...data);
      }

      setImages((currentImages) =>
        [...currentImages, ...createdImages].sort((left, right) => left.sortOrder - right.sortOrder)
      );
      setUploadMessage('Upload complete.');
    } catch (error: any) {
      console.error('Error uploading gallery images:', error);
      setUploadMessage(error.message || 'Failed to upload gallery images.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleImageChange = (
    imageId: string,
    field: 'altText' | 'caption' | 'sortOrder',
    value: string
  ) => {
    setImages((currentImages) =>
      currentImages.map((image) => {
        if (image.id !== imageId) {
          return image;
        }

        if (field === 'sortOrder') {
          return {
            ...image,
            sortOrder: Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value))) : 0,
          };
        }

        return {
          ...image,
          [field]: value,
        };
      })
    );
  };

  const handleSave = async (image: BlogGalleryImage) => {
    setSavingImageId(image.id);

    try {
      const response = await fetch(`/api/admin/blog/${postId}/images/${image.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altText: image.altText || '',
          caption: image.caption || '',
          sortOrder: image.sortOrder,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save gallery image changes.');
      }

      setImages((currentImages) =>
        currentImages
          .map((currentImage) => (currentImage.id === image.id ? data : currentImage))
          .sort((left, right) => left.sortOrder - right.sortOrder)
      );
    } catch (error: any) {
      console.error('Error saving gallery image:', error);
      alert(error.message || 'Failed to save gallery image changes.');
    } finally {
      setSavingImageId(null);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Delete this gallery image?')) {
      return;
    }

    setDeletingImageId(imageId);

    try {
      const response = await fetch(`/api/admin/blog/${postId}/images/${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete gallery image.');
      }

      setImages((currentImages) => currentImages.filter((image) => image.id !== imageId));
    } catch (error: any) {
      console.error('Error deleting gallery image:', error);
      alert(error.message || 'Failed to delete gallery image.');
    } finally {
      setDeletingImageId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[rgb(var(--color-brown))]">Gallery Images</h2>
          <p className="text-sm text-neutral-500">
            Upload extra images for a gallery section on the public blog post.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Gallery Images
              </>
            )}
          </Button>
        </div>
      </div>

      {uploadMessage && (
        <p className="text-sm text-neutral-600">{uploadMessage}</p>
      )}

      {images.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          No gallery images yet.
        </div>
      ) : (
        <div className="space-y-6">
          {images.map((image) => (
            <div key={image.id} className="grid gap-4 rounded-xl border p-4 md:grid-cols-[220px,1fr]">
              <div className="overflow-hidden rounded-lg border bg-neutral-100">
                <img
                  src={image.url}
                  alt={image.altText || image.caption || 'Blog gallery image'}
                  className="h-52 w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`caption-${image.id}`}>Caption</Label>
                    <Input
                      id={`caption-${image.id}`}
                      value={image.caption || ''}
                      onChange={(event) => handleImageChange(image.id, 'caption', event.target.value)}
                      placeholder="Optional gallery caption"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`alt-${image.id}`}>Alt Text</Label>
                    <Input
                      id={`alt-${image.id}`}
                      value={image.altText || ''}
                      onChange={(event) => handleImageChange(image.id, 'altText', event.target.value)}
                      placeholder="Accessible image description"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[140px,1fr]">
                  <div className="space-y-2">
                    <Label htmlFor={`order-${image.id}`}>Display Order</Label>
                    <Input
                      id={`order-${image.id}`}
                      type="number"
                      min="0"
                      value={image.sortOrder}
                      onChange={(event) => handleImageChange(image.id, 'sortOrder', event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Blob Path</Label>
                    <p className="rounded-lg border bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-500">
                      {image.pathname}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSave(image)}
                    disabled={savingImageId === image.id}
                  >
                    {savingImageId === image.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Image Details
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDelete(image.id)}
                    disabled={deletingImageId === image.id}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    {deletingImageId === image.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}