
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const chapter = params.chapter;

  const res = await fetch(`http://sanskrit.ie/api/geeta.php?q=${chapter}`);

  if (!res.ok) {
    return new Response('Upstream API error', { status: 500 });
  }

  const data = await res.text(); 
  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/json'
    }
  });
};
