import { Member, Profile, Server, Channel } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
}