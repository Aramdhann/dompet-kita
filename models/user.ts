/**
 * User Model
 *
 * Represents user accounts in the application
 *
 * Database Tables:
 * - users (id, name, email, profession, avatar_color, avatar_initials, is_online, created_at, updated_at)
 *
 * Fields:
 * - id: Primary key (auto-increment/UUID)
 * - name: User's full name
 * - email: User's email address
 * - profession: User's profession/job title
 * - avatarColor: Gradient color class for avatar
 * - avatarInitials: User's initials for avatar
 * - isOnline: Online status indicator
 * - createdAt: Timestamp when account was created
 * - updatedAt: Timestamp when profile was last updated
 */
export interface User {
  id?: string;
  name: string;
  email: string;
  profession: string;
  avatarColor?: string;
  avatarInitials?: string;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Sample user data
 * This represents the currently logged-in user
 */
export const currentUser: User = {
  id: 'user-1',
  name: 'User 1',
  email: 'user@email.com',
  profession: 'Fullstack Developer',
  avatarColor: 'from-blue-500 to-blue-600',
  avatarInitials: 'U1',
  isOnline: true,
  createdAt: new Date('2026-01-15'),
  updatedAt: new Date('2026-03-01'),
};
