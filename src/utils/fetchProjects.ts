// fetchProjects.ts
import type { Project } from './interfaces';

const WORKER_URL = import.meta.env.VITE_CF_WORKER_URL as string;
const API_KEY = import.meta.env.VITE_CF_INTERNAL_KEY as string;

/**
 * Fetch all projects using the REST API endpoint.
 * @returns Parsed list of Project objects.
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${WORKER_URL}/rest/projects`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch projects:', res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data.results)) {
      console.error('Unexpected data format:', data);
      return [];
    }

    return data.results.map((p: any) => ({
      ...p,
      assets: JSON.parse(p.assets), // convert JSON string to array
    })) as Project[];

  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}
