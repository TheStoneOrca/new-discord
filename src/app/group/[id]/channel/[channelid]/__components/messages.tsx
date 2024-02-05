"use client";

import GetChannel from "@/actions/getchannel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import EditMessageMenu from "./editmessagemenu";

export default function Messages(props: { channelid: number }) {
  const [messages, setMessage] = useState<Array<any>>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    GetChannel({ channelid: props.channelid as any }).then((res) => {
      if (res.error) {
        setMessage([]);
      } else {
        setMessage(res.channelData?.channelMessages);
      }
    });
  }, []);

  return (
    <div>
      {messages && isLoaded && user ? (
        <div>
          {messages.length <= 0 && <h1>No Messages; Create One!</h1>}{" "}
          {messages.length > 0 && (
            <div className="block">
              {messages.map((message) => (
                <div key={message.messageid}>
                  <Alert className="w-[500px]">
                    <div className="flex">
                      {user.id === message.messagesender && (
                        <EditMessageMenu
                          messageid={message.messageid}
                          messagetext={message.messagetext}
                        />
                      )}
                      <AlertTitle className="ml-2">
                        By {message.username}
                      </AlertTitle>
                    </div>
                    <AlertDescription
                      dangerouslySetInnerHTML={{ __html: message.messagetext }}
                    ></AlertDescription>
                  </Alert>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
