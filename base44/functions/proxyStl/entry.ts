Deno.serve(async (req) => {
  const { url } = await req.json();

  if (!url || !url.startsWith("http")) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  const res = await fetch(url);
  if (!res.ok) {
    return Response.json({ error: `Fetch failed: ${res.status}` }, { status: 502 });
  }

  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "model/stl",
      "Access-Control-Allow-Origin": "*",
    },
  });
});