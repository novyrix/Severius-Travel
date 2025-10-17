'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Power, PowerOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface TourActionsProps {
  tourId: string;
  tourTitle: string;
  published: boolean;
}

export function TourActions({ tourId, tourTitle, published }: TourActionsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingPublish, setIsTogglingPublish] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/tours/${tourId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to delete tour');
        return;
      }

      router.refresh();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('Failed to delete tour');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async () => {
    setIsTogglingPublish(true);
    try {
      const response = await fetch(`/api/admin/tours/${tourId}/toggle-publish`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to toggle publish status');
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Failed to toggle publish status');
    } finally {
      setIsTogglingPublish(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleTogglePublish}
        disabled={isTogglingPublish}
        className={published ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
      >
        {published ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDeleteDialog(true)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{tourTitle}"? This action cannot be undone.
              Tours with existing bookings cannot be deleted.
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
    </>
  );
}
