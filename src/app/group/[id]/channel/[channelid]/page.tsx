"use client";

import GetChannel from "@/actions/getchannel";
import { useParams } from "next/navigation";
import MessageForm from "./__components/createmessage";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Messages from "./__components/messages";

export default function ChannelPage() {
  const { channelid, id } = useParams();
  const { isLoaded, user } = useUser();

  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <Messages channelid={channelid as any} />
      </div>
      <div className="absolute bottom-4">
        {isLoaded ? (
          <MessageForm
            channelid={channelid as any}
            groupid={id as any}
            userid={user?.id as any}
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>
    </div>
  );
}
