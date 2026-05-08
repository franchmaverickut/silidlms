import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const [published, comingSoon] = await Promise.all([
      base44.asServiceRole.entities.Course.filter({ status: "published" }, "-created_date", 50),
      base44.asServiceRole.entities.Course.filter({ status: "coming_soon" }, "-created_date", 50),
    ]);

    const toSummary = (c, status) => ({
      id: c.id, title: c.title, description: c.description, skill_area: c.skill_area,
      difficulty: c.difficulty, thumbnail_url: c.thumbnail_url, duration_hours: c.duration_hours,
      total_lessons: c.total_lessons, grade_levels: c.grade_levels, tags: c.tags,
      learning_objectives: c.learning_objectives, status,
    });

    const summaries = [
      ...published.map(c => toSummary(c, "published")),
      ...comingSoon.map(c => toSummary(c, "coming_soon")),
    ];

    return Response.json({ courses: summaries });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});