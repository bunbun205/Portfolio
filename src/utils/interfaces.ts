// src/utils/interfaces.ts

import type { FunctionComponent } from "react";

// Project format expected by the frontend
export interface Project {
  id: string;
  title: string;
  assets: string[]; // List of media URLs
  thumbnail_url: string;
  category: string;
  description?: string;
  likes: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  content: string;
  likes: number;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  parent_comment_id?: string | null;
  likes: number;
  flags: number;
  created_at: string;
}
