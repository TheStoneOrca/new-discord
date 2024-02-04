"use client";

import { useState } from "react";
import MessageFormTextArea from "./messagetextarea";
import { Input } from "@/components/ui/input";
import CreateMessage from "@/actions/createmessage";

export default function MessageForm(props: {
  groupid: number;
  channelid: number;
  userid: string;
}) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>();

  return (
    <div className="flex">
      <form
        action={(data: FormData) => {
          CreateMessage(data).then((res) => {
            if (res.error) {
              setError(error);
            }
          });
        }}
      >
        <MessageFormTextArea setContent={setContent} />
        <Input type="hidden" value={content} name="messagetext" />

        <Input type="hidden" value={props.groupid} name="messagegroup" />
        <Input type="hidden" value={props.channelid} name="messagesentin" />
        <Input type="hidden" value={props.userid} name="messagesender" />

        <Input type="submit" value="Post" className="h-[40px] w-40" />

        {error && <h1>{error}</h1>}
      </form>
    </div>
  );
}
