import type { User } from '@prisma/client';

export const mockUser: Omit<User, 'createdAt' | 'updatedAt'> = {
  id: 'test-user-001',
  email: 'test@example.com',
  name: 'Test User',
  image: null,
  hashedPassword: '$2a$10$mockhashedpassword',
  role: 'USER',
  isActive: true,
  emailVerified: new Date('2025-01-01'),
  resetToken: null,
  resetTokenExpiry: null,
};

export const mockAdminUser: Omit<User, 'createdAt' | 'updatedAt'> = {
  ...mockUser,
  id: 'test-admin-001',
  email: 'admin@example.com',
  name: 'Test Admin',
  role: 'ADMIN',
};
