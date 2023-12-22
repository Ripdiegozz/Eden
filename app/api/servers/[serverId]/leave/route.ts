import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!params) {
            return new NextResponse('Server ID is missing', { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[DELETE_MEMBER] ERROR:", error);
        throw new NextResponse('Internal Server Error', { status: 500 });
    }
}