// fetchProjects.ts
import type { Project, ProjectAssets } from './interfaces';

const API_BASE = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY = "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";

/**
 * Fetch all projects using the REST API endpoint.
 * @returns Parsed list of Project objects.
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/rest/projects`, {
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
      assets: JSON.parse(p.assets) as ProjectAssets,
    })) as Project[];

  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}
