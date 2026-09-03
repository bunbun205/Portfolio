// fetchProjects.ts
import type { Project, ProjectAssets } from './interfaces';

const API_BASE = "https://portfolio-backend.mayank69123-5d3.workers.dev";

/**
 * Fetch all projects using the REST API endpoint.
 * @returns Parsed list of Project objects.
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);

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
