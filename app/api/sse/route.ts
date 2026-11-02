export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Yahan aap apne backend/SignalR/Hub events sun sakte hain
      const interval = setInterval(() => {
        controller.enqueue(encoder.encode("data: refresh\n\n"));
      }, 15000); // 15 seconds ya event-driven trigger

      return () => clearInterval(interval);
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