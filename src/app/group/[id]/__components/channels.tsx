"use client";

import GetChannels from "@/actions/getchannels";
import { Button } from "@/components/ui/button";
import { AudioLinesIcon, ClipboardEditIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Channels(props: {
  channelcatergory: number;
  channelgroup: number;
}) {
  const [channels, setChannels] = useState<any>();

  useEffect(() => {
    GetChannels({ channelcatergory: props.channelcatergory }).then((res) => {
      if (res.channels) {
        setChannels(res.channels);
      } else if (res.error) {
        setChannels(false);
      }
    });
  }, []);

  return (
    <div>
      {channels ? (
        <div>
          {channels === false && (
            <h1 className="text-black dark:text-white text-sm">No Channels</h1>
          )}
          {channels.length <= 0 && (
            <h1 className="text-black dark:text-white text-sm">No Channels</h1>
          )}
          {channels.length > 0 &&
            channels.map((channel: any) => (
              <div
                key={channel.channelid}
                className="text-black dark:text-white text-sm mt-0"
              >
                {channel.channeltype === "text" && (
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Link
                      className="flex "
                      href={`/group/${props.channelgroup}/channel/${channel.channelid}`}
                    >
                      <ClipboardEditIcon />
                      {channel.channelname}
                    </Link>
                  </Button>
                )}
                {channel.channeltype === "voice" && (
                  <Link
                    className="flex"
                    href={`/group/${props.channelgroup}/channel/${channel.channelid}/voice`}
                  >
                    {" "}
                    <AudioLinesIcon />
                    {channel.channelname}
                  </Link>
                )}
              </div>
            ))}
        </div>
      ) : (
        <Loader2Icon className="text-black dark:text-white animate-spin " />
      )}
    </div>
  );
}
