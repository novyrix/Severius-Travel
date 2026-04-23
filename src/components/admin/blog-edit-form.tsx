'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BLOG_CATEGORY_OPTIONS, DEFAULT_BLOG_CATEGORY } from '@/lib/blog';
import { BlogFeaturedImageField } from '@/components/admin/blog-featured-image-field';
import { BlogGalleryManager } from '@/components/admin/blog-gallery-manager';

interface BlogEditFormProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featuredImage: string | null;
    authorName: string | null;
    category: string;
    readTimeMinutes: number;
    featured: boolean;
    published: boolean;
    createdAt: Date | string;
    galleryImages: Array<{
      id: string;
      url: string;
      pathname: string;
      altText: string | null;
      caption: string | null;
      sortOrder: number;
    }>;
    author: {
      name: string | null;
      email: string | null;
    } | null;
  };
}

export function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    authorName: post.authorName || '',
    category: post.category || DEFAULT_BLOG_CATEGORY,
    readTimeMinutes: String(post.readTimeMinutes || ''),
    content: post.content,
    published: post.published,
    featured: post.featured,
    featuredImage: post.featuredImage || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update blog post');
        return;
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Failed to update blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to delete blog post');
        return;
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Edit Blog Post</h1>
              <p className="text-sm text-neutral-500 mt-1">
                Created {new Date(post.createdAt).toLocaleDateString()} by{' '}
                {post.authorName || post.author?.name || post.author?.email || 'Unknown'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Post
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter blog post title"
                  className="text-lg"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="url-friendly-slug"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-neutral-500">
                  URL: /blog/{formData.slug || 'your-slug-here'}
                </p>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short description of the blog post"
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-gold))] focus:border-transparent resize-none"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="Defaults to the current or existing author"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    list="blog-category-options"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Travel Tips"
                  />
                  <datalist id="blog-category-options">
                    {BLOG_CATEGORY_OPTIONS.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTimeMinutes">Read Time (minutes)</Label>
                  <Input
                    id="readTimeMinutes"
                    type="number"
                    min="1"
                    value={formData.readTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, readTimeMinutes: e.target.value })}
                    placeholder="Leave blank to auto-calculate"
                  />
                  <p className="text-xs text-neutral-500">
                    Leave this blank to let the backend estimate the read time from the content.
                  </p>
                </div>

                <BlogFeaturedImageField
                  value={formData.featuredImage}
                  onChange={(featuredImage) => setFormData({ ...formData, featuredImage })}
                  disabled={isSubmitting || isDeleting}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your blog post content here... Use the toolbar to format text and add images."
                />
                <p className="text-xs text-neutral-500">
                  💡 Use the toolbar to format text, add headings, lists, links, and images
                </p>
              </div>

              {/* Published */}
              <div className="grid gap-4 rounded-lg bg-neutral-50 p-4 md:grid-cols-2">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="mt-0.5 h-5 w-5 rounded border-neutral-300 text-[rgb(var(--color-gold))] focus:ring-[rgb(var(--color-gold))]"
                  />
                  <div>
                    <Label htmlFor="published" className="font-medium">Published</Label>
                    <p className="text-sm text-neutral-500">
                      {formData.published
                        ? 'This post is visible to everyone'
                        : 'This post is saved as a draft'}
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mt-0.5 h-5 w-5 rounded border-neutral-300 text-[rgb(var(--color-gold))] focus:ring-[rgb(var(--color-gold))]"
                  />
                  <div>
                    <Label htmlFor="featured" className="font-medium">Featured Post</Label>
                    <p className="text-sm text-neutral-500">
                      Pin this post to the top of the public blog listing.
                    </p>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Link href="/admin/blog">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90"
                >
                  {isSubmitting ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        <Card>
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogGalleryManager postId={post.id} initialImages={post.galleryImages} />
          </CardContent>
        </Card>

        {/* Delete Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{post.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
