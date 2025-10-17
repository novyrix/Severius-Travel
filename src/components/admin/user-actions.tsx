'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit, Power, PowerOff } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserActionsProps {
  userId: string;
  userName: string | null;
  userEmail: string;
  userRole: string;
  isActive: boolean;
}

export function UserActions({ userId, userName, userEmail, userRole, isActive }: UserActionsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  
  const [editData, setEditData] = useState({
    name: userName || '',
    role: userRole,
    isActive: isActive,
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to delete user');
        return;
      }

      router.refresh();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update user');
        return;
      }

      router.refresh();
      setShowEditDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleStatus = async () => {
    setIsTogglingStatus(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editData,
          isActive: !isActive,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to toggle user status');
        return;
      }

      router.refresh();
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Failed to toggle user status');
    } finally {
      setIsTogglingStatus(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggleStatus}
        disabled={isTogglingStatus}
        className={isActive ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
      >
        {isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowEditDialog(true)}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDeleteDialog(true)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={userEmail} disabled />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={editData.role}
                onValueChange={(value) => setEditData({ ...editData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={editData.isActive}
                onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isActive">Account Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete user "{userName || userEmail}"? This action cannot be undone.
              Users with existing bookings cannot be deleted.
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
