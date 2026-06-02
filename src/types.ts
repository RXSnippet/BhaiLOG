/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectStatus = 'OPEN' | 'IN DEVELOPMENT' | 'CLAIMED' | 'HIGH PRIORITY';

export interface Idea {
  id: string;
  title: string;
  description: string;
  problemStatement?: string;
  solution?: string;
  targetAudience?: string;
  status: ProjectStatus;
  upvotes: number;
  hasUpvoted?: boolean;
  category: 'Web' | 'App' | 'AI' | 'Social';
  tags: string[];
  author: {
    name: string;
    avatarUrl?: string;
    role?: string;
  };
  createdAt: string;
  needsRoles?: string[];
  roadmap?: string[];
  additionalDetails?: string;
  activeContributorsCount?: number;
  collaborators?: { name: string; avatarUrl: string }[];
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Dreamer' | 'Builder' | 'Dual';
}

export interface DeveloperProject {
  id: string;
  title: string;
  status: 'PLANNING' | 'IN PROGRESS' | 'COMPLETED';
  progress: number;
  milestone: string;
}
