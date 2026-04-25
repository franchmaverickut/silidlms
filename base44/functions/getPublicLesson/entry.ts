import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { lesson_id } = await req.json();

    if (!lesson_id) {
      return Response.json({ error: 'lesson_id is required' }, { status: 400 });
    }

    const [lessons, allLessonsInModule] = await Promise.all([
      base44.asServiceRole.entities.Lesson.filter({ id: lesson_id }),
      Promise.resolve([]), // placeholder, will fetch after we have the lesson
    ]);

    const lesson = lessons[0];
    if (!lesson) {
      return Response.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Fetch sibling lessons for prev/next navigation
    const siblings = await base44.asServiceRole.entities.Lesson.filter(
      { course_id: lesson.course_id, module_id: lesson.module_id },
      'order'
    );

    return Response.json({ lesson, siblings });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});