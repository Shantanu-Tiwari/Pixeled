import { Liveblocks } from "@liveblocks/node";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY });

export async function POST(req: Request): Promise<Response> {
  try {
    console.log("[Liveblocks Auth] Starting authentication...");

    const userSession = await auth();
    console.log("[Liveblocks Auth] Session:", userSession);

    if (!userSession || !userSession.user?.id) {
      console.error("[Liveblocks Auth] No user session.");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await db.user.findUniqueOrThrow({
      where: { id: userSession.user.id },
      include: {
        ownedRooms: true,
        roomInvites: { include: { room: true } },
      },
    });

    console.log("[Liveblocks Auth] User fetched:", user.email);

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.email ?? "Anonymous",
      },
    });

    const combinedRoomIds = [
      ...user.ownedRooms.map((r) => r.id),
      ...user.roomInvites.map((inv) => inv.room.id),
    ];

    const uniqueRoomIds = Array.from(new Set(combinedRoomIds)).slice(0, 10);

    console.log("[Liveblocks Auth] Adding permissions for rooms:");
    for (const roomId of uniqueRoomIds) {
      console.log(`  - room:${roomId}`);
      session.allow(`room:${roomId}`, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();

    return new Response(body, {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("[Liveblocks Auth] Internal Server Error:", err);
    return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
    );
  }
}
