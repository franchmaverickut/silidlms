import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { lesson_id } = await req.json();

    if (!lesson_id) {
      return Response.json({ error: 'lesson_id is required' }, { status: 400 });
    }

    const lessons = await base44.asServiceRole.entities.MakerLesson.filter({ id: lesson_id });
    const lesson = lessons[0];

    if (!lesson) {
      return Response.json({ error: 'Lesson not found' }, { status: 404 });
    }

    if (lesson.status !== 'published') {
      return Response.json({ error: 'Lesson not published' }, { status: 403 });
    }

    return Response.json({ lesson });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});