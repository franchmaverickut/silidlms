import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { course_id } = await req.json();

    if (!course_id) {
      return Response.json({ error: 'course_id is required' }, { status: 400 });
    }

    const [courses, modules, lessons] = await Promise.all([
      base44.asServiceRole.entities.Course.filter({ id: course_id, status: "published" }),
      base44.asServiceRole.entities.Module.filter({ course_id }, "order"),
      base44.asServiceRole.entities.Lesson.filter({ course_id }, "order"),
    ]);

    const course = courses[0];
    if (!course) {
      return Response.json({ error: 'Course not found' }, { status: 404 });
    }

    // Strip heavy fields from lessons — content is loaded on-demand via getPublicLesson
    const lessonSummaries = lessons.map(({ id, module_id, course_id, title, type, duration_minutes, order, is_published, objectives, materials }) => ({
      id, module_id, course_id, title, type, duration_minutes, order, is_published, objectives, materials,
    }));

    return Response.json({ course, modules, lessons: lessonSummaries });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});