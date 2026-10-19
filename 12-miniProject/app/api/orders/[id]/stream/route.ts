import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statuses = [
  { status: "preparing", label: "Preparing your order" },
  { status: "picked_up", label: "Courier picked up your order" },
  { status: "on_the_way", label: "Your order is on the way" },
  { status: "delivered", label: "Order delivered" },
];

const encoder = new TextEncoder();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(id)) {
    return Response.json({ error: "Invalid order ID" }, { status: 400 });
  }

  let interval: ReturnType<typeof setInterval> | undefined;
  let closed = false;
  let index = 0;

  const stream = new ReadableStream({
    start(controller) {
      function send(item: (typeof statuses)[number]) {
        controller.enqueue(
          encoder.encode(
            data: ${JSON.stringify({
              orderId: id,
              ...item,
              updatedAt: new Date().toISOString(),
            })}\n\n
          )
        );
      }

      send(statuses[index]);

      interval = setInterval(() => {
        if (closed) return;

        index += 1;

        if (index >= statuses.length) {
          cleanup();
          controller.close();
          return;
        }

        send(statuses[index]);

        if (statuses[index].status === "delivered") {
          if (interval) clearInterval(interval);
          interval = undefined;

          setTimeout(() => {
            if (!closed) {
              cleanup();
              controller.close();
            }
          }, 250);
        }
      }, 4000);

      request.signal.addEventListener("abort", cleanup, { once: true });
    },

    cancel() {
      cleanup();
    },
  });

  function cleanup() {
    if (closed) return;
    closed = true;
    if (interval) clearInterval(interval);
    request.signal.removeEventListener("abort", cleanup);
  }

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}