import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

const demoStatuses = [
  { status: "preparing", label: "Preparing your order" },
  { status: "picked_up", label: "Courier picked up your order" },
  { status: "on_the_way", label: "Your order is on the way" },
  { status: "delivered", label: "Order delivered" },
] as const;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(id)) {
    return Response.json(
      { error: "Invalid order ID" },
      { status: 400 }
    );
  }

  let timer: ReturnType<typeof setInterval> | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;
  let closed = false;
  let index = 0;
  let controllerRef: ReadableStreamDefaultController<Uint8Array> | undefined;

  function cleanup() {
    if (closed) return;
    closed = true;

    if (timer) clearInterval(timer);
    if (heartbeat) clearInterval(heartbeat);

    request.signal.removeEventListener("abort", cleanup);
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;

      const send = (event: string, data: unknown) => {
        if (closed) return;

        try {
          controller.enqueue(
            encoder.encode(
              event: ${event}\ndata: ${JSON.stringify(data)}\n\n
            )
          );
        } catch {
          cleanup();
        }
      };

      send("status", {
        orderId: id,
        ...demoStatuses[index],
        updatedAt: new Date().toISOString(),
      });

      timer = setInterval(() => {
        if (closed) return;

        index += 1;

        const item = demoStatuses[index];

        if (!item) {
          cleanup();
          try {
            controller.close();
          } catch {}
          return;
        }

        send("status", {
          orderId: id,
          ...item,
          updatedAt: new Date().toISOString(),
        });

        if (item.status === "delivered") {
          if (timer) clearInterval(timer);
          timer = undefined;

          // Give the delivered event time to flush before closing.
          const finishTimer = setTimeout(() => {
            if (closed) return;
            cleanup();
            try {
              controller.close();
            } catch {}
          }, 250);

          request.signal.addEventListener(
            "abort",
            () => clearTimeout(finishTimer),
            { once: true }
          );
        }
      }, 4000);

      heartbeat = setInterval(() => {
        if (!closed) {
          try {
            controller.enqueue(encoder.encode(": keep-alive\n\n"));
          } catch {
            cleanup();
          }
        }
      }, 15000);

      request.signal.addEventListener("abort", cleanup, {
        once: true,
      });
    },

    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}