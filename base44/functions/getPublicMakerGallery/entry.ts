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

    // Fetch ALL published lessons — no artificial limit
    const lessons = await base44.asServiceRole.entities.MakerLesson.filter(
      { status: 'published' },
      '-created_date',
      500
    );

    // Return only the lightweight fields needed for gallery cards
    const cards = lessons.map(l => ({
      id:                l.id,
      title:             l.title,
      description:       l.description || null,
      skill_area:        l.skill_area  || null,
      difficulty:        l.difficulty  || null,
      estimated_minutes: l.estimated_minutes || null,
      // Prefer thumbnail; fall back to hero image; null if neither
      img: l.thumbnail_url || l.hero_image_url || null,
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