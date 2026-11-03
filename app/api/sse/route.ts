// app/api/sse/route.ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Yahan aap apne backend Hub/WebSocket event listener ko connect kar sakte hain
      const pingInterval = setInterval(() => {
        controller.enqueue(encoder.encode("data: ping\n\n"));
      }, 30000);

      return () => {
        clearInterval(pingInterval);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}