Bun.serve({
  fetch(req) {
    return new Response("hello from bun server");
  },
});
