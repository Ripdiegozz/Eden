import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/media-room";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params: {
        serverId,
        channelId
    }
}: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId
        }
    });
    
    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile?.id
        }
    });

    if (!member || !channel) {
        return redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatHeader
                        name={channel.name}
                        serverId={channel.serverId}
                        type="channel"
                    />
                    <ChatMessages
                        member={member}
                        name={channel.name}
                        chatId={channel.id}
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                        type="channel"
                    />
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                    />
                </>
            )}
            {
                ChannelType.AUDIO === channel.type && (
                    <MediaRoom 
                        chatId={channel.id}
                        video={false}
                        audio={true}
                    />
                )
            }
            {
                ChannelType.VIDEO === channel.type && (
                    <MediaRoom 
                        chatId={channel.id}
                        video={true}
                        audio={true}
                    />
                )
            }
        </div>
    );
}

export default ChannelIdPage;