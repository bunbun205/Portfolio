import type { Comment } from './interfaces';

const WORKER_URL = "https://portfolio-backend.mayank69123-5d3.workers.dev";

export async function fetchComments(): Promise<Comment[]> {

  try {
    const res = await fetch(`${WORKER_URL}/comments`);

    if (!res.ok) {
      console.error('[fetchComments] HTTP error:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data.results)) {
      console.error('[fetchComments] Unexpected format:', data);
      return [];
    }

    const comments = data.results as Comment[];

    return comments;
  } catch (err) {
    console.error('[fetchComments] Exception caught:', err);
    return [];
  }
}
