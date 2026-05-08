import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { course_id } = await req.json();

    if (!course_id) {
      return Response.json({ error: 'course_id is required' }, { status: 400 });
    }

    const [courses, modules, lessons] = await Promise.all([
      base44.asServiceRole.entities.Course.filter({ id: course_id }),
      base44.asServiceRole.entities.Module.filter({ course_id }, "order"),
      base44.asServiceRole.entities.Lesson.filter({ course_id }, "order"),
    ]);

    const course = courses[0];
    if (!course) {
      return Response.json({ error: 'Course not found', detail: 'no_record' }, { status: 404 });
    }
    if (course.status !== 'published') {
      return Response.json({ error: 'Course is not published', detail: 'not_published' }, { status: 404 });
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
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});