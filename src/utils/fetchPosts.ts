// utils/fetchPosts.ts
import type { BlogPost } from './interfaces';

const API_BASE = "https://portfolio-backend.mayank69123-5d3.workers.dev";
/**
 * Fetches blog posts from the Cloudflare Worker REST API
 */
export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE}/posts`);

    if (!res.ok) {
      console.error('Failed to fetch blog posts:', res.statusText);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data.results)) {
      console.error('Unexpected posts format:', data);
      return [];
    }

    return data.results as BlogPost[];
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}
