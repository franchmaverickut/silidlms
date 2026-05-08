import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Simple in-memory cache: course_id -> { data, ts }
const cache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minute

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { course_id } = await req.json();

    if (!course_id) {
      return Response.json({ error: 'course_id is required' }, { status: 400 });
    }

    // Serve from cache if fresh
    const cached = cache.get(course_id);
    if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
      return Response.json(cached.data, {
        headers: { 'X-Cache': 'HIT' }
      });
    }

    const [courses, modules, lessons] = await Promise.all([
      base44.asServiceRole.entities.Course.filter({ id: course_id, status: "published" }),
      base44.asServiceRole.entities.Module.filter({ course_id }, "order"),
      base44.asServiceRole.entities.Lesson.filter({ course_id, is_published: true }, "order"),
    ]);

    const course = courses[0];
    if (!course) {
      return Response.json({ error: 'Course not found' }, { status: 404 });
    }

    // Minimal course fields only
    const courseSummary = {
      id: course.id,
      title: course.title,
      description: course.description,
      skill_area: course.skill_area,
      difficulty: course.difficulty,
      thumbnail_url: course.thumbnail_url,
      duration_hours: course.duration_hours,
      grade_levels: course.grade_levels,
      learning_objectives: course.learning_objectives,
      materials_required: course.materials_required,
      enrolled_count: course.enrolled_count,
    };

    // Minimal module fields
    const moduleSummaries = modules.map(({ id, title, order }) => ({ id, title, order }));

    // Minimal lesson fields — no content, no HTML, no objectives body
    const lessonSummaries = lessons.map(({ id, module_id, title, type, duration_minutes, order }) => ({
      id, module_id, title, type, duration_minutes, order,
    }));

    const data = { course: courseSummary, modules: moduleSummaries, lessons: lessonSummaries };

    // Store in cache
    cache.set(course_id, { data, ts: Date.now() });

    return Response.json(data, {
      headers: { 'X-Cache': 'MISS' }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});