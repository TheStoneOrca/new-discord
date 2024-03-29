"use client";

import GetChannels from "@/actions/getchannels";
import { AudioLinesIcon, ClipboardEditIcon, Loader2Icon } from "lucide-react";
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
                  <h1 className="flex">
                    <ClipboardEditIcon />
                    {channel.channelname}
                  </h1>
                )}
                {channel.channeltype === "voice" && (
                  <h1 className="flex">
                    <AudioLinesIcon />
                    {channel.channelname}
                  </h1>
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
