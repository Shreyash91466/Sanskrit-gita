
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const chapter = params.chapter;

  const res = await fetch(`/api/geeta/${chapter}`);
  if (!res.ok) {
    throw new Error(`Failed to load verses for chapter ${chapter}`);
  }

  const json = await res.json();  // { status, message, data: [...] }
  const verses = json.data ?? []; // safe default

  return { chapter, verses };
};
