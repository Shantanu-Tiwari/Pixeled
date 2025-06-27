import { Liveblocks } from "@liveblocks/node";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY });

export async function POST(req: Request) {
  try {
    console.log("[Liveblocks Auth] Starting authentication...");

    const userSession = await auth();
    console.log("[Liveblocks Auth] Session:", userSession);

    if (!userSession || !userSession.user?.id) {
      console.error("[Liveblocks Auth] No user session.");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await db.user.findUniqueOrThrow({
      where: { id: userSession.user.id },
      include: {
        ownedRooms: true,
        roomInvites: {
          include: { room: true },
        },
      },
    });

    console.log("[Liveblocks Auth] User fetched:", user.email);

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.email ?? "Anonymous",
      },
    });

    // Combine owned + invited rooms
    const combinedRoomIds = [
      ...user.ownedRooms.map((r) => r.id),
      ...user.roomInvites.map((inv) => inv.room.id),
    ];

    // Remove duplicates, take only first 10
    const uniqueRoomIds = Array.from(new Set(combinedRoomIds)).slice(0, 10);

    console.log("[Liveblocks Auth] Adding permissions for up to 10 rooms:");
    uniqueRoomIds.forEach((roomId) => {
      console.log(`  - room:${roomId}`);
      session.allow(`room:${roomId}`, session.FULL_ACCESS);
    });

    const { status, body } = await session.authorize();

    return new Response(body, { status });
  } catch (err) {
    console.error("[Liveblocks Auth] Internal Server Error:", err);
    return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
    );
  }
}
