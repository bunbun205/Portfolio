import type { Comment } from './interfaces';

const API_BASE = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY = "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";

export async function postComment(comment: Comment) {
  try {
    const res = await fetch(`${API_BASE}/rest/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(comment),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    console.error('[postComment] Failed to post comment:', err);
  }
}

export async function updateComment(id: string, fields: Partial<Comment>) {
  try {
    const res = await fetch(`${API_BASE}/rest/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    console.error('[updateComment] Failed to patch comment:', err);
  }
}
