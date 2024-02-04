"use client";

import GetChannel from "@/actions/getchannel";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import MessageForm from "./__components/createmessage";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Catergories from "../../__components/catergories";

export default function ChannelPage() {
  const { channelid, id } = useParams();
  const { isLoaded, user } = useUser();

  return (
    <div className="flex">
      <Catergories groupid={id as any} />
      <div className="absolute bottom-10">
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
