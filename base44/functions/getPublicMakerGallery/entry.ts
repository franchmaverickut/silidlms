import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Simple in-process cache: revalidates every 5 minutes
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

Deno.serve(async (req) => {
  try {
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_TTL) {
      return Response.json(cache, {
        headers: { 'Cache-Control': 'public, max-age=300' }
      });
    }

    const base44 = createClientFromRequest(req);
    const lessons = await base44.asServiceRole.entities.MakerLesson.filter(
      { status: 'published' },
      '-created_date',
      100
    );

    // Return only fields needed for gallery cards — no content, no steps, no HTML
    const cards = lessons.map(({ id, title, description, skill_area, difficulty, estimated_minutes, thumbnail_url, hero_image_url }) => ({
      id,
      title,
      description,
      skill_area,
      difficulty,
      estimated_minutes,
      img: thumbnail_url || hero_image_url || null,
    }));

    cache = { cards };
    cacheTime = now;

    return Response.json({ cards }, {
      headers: { 'Cache-Control': 'public, max-age=300' }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});