import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE (
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new Response('Unauthorized', { status: 401 });
        }

        if (!params) {
            return new Response('Server ID is missing', { status: 400 });
        }

        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[DELETE_SERVER] ERROR:", error);
    }
}