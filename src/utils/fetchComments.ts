import type { Comment } from './interfaces';

const WORKER_URL = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY = "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";

export async function fetchComments(): Promise<Comment[]> {

  try {
    const res = await fetch(`${WORKER_URL}/rest/comments`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

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
