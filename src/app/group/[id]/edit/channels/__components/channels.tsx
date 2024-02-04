"use client";

import GetChannels from "@/actions/getchannels";
import { Loader2Icon } from "lucide-react";
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
          {channels === false && <h1>No Channels</h1>}
          {channels.length <= 0 && <h1>No Channels</h1>}
          {channels.length > 0 &&
            channels.map((channel: any) => (
              <div key={channel.channelid}>
                <h1>{channel.channelname}</h1>
              </div>
            ))}
        </div>
      ) : (
        <Loader2Icon className="text-black animate-spin" />
      )}
    </div>
  );
}
