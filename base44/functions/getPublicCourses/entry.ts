import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const courses = await base44.asServiceRole.entities.Course.filter(
      { status: "published" },
      "-created_date",
      50
    );

    // Return only fields needed for the course card — no heavy content fields
    const summaries = courses.map(({ id, title, description, skill_area, difficulty, thumbnail_url, duration_hours, total_lessons, grade_levels, tags }) => ({
      id, title, description, skill_area, difficulty, thumbnail_url, duration_hours, total_lessons, grade_levels, tags,
    }));

    return Response.json({ courses: summaries });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});