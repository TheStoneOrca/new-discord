"use client";

import GetChannel from "@/actions/getchannel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
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
        let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as any, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as any,
        });

        let channel = pusher.subscribe("messages");
        channel.bind("newmessage", (data: any) => {
          const message = JSON.parse(data.message);

          const msg: {
            channelid: number;
            user: string;
            messagetext: string;
            messageid: number;
          } = message.message;

          if (Number(msg.channelid) == Number(props.channelid)) {
            res.channelData?.channelMessages.push({
              messageid: msg.messageid,
              messagesender: msg.user,
              messagetext: msg.messagetext,
            });

            setMessage(res.channelData?.channelMessages);
          }
        });

        channel.bind("editmessage", (data: any) => {
          const message = JSON.parse(data.message);

          const msg: {
            channelid: number;
            user: string;
            messagetext: string;
            messageid: number;
            username: string;
          } = message.message;

          if (Number(msg.channelid) == Number(props.channelid)) {
            const indexOfMessage = res.channelData?.channelMessages.findIndex(
              (message) => message.messageid === msg.messageid
            );

            if ((indexOfMessage as any) > -1) {
              res.channelData?.channelMessages.splice(indexOfMessage as any, 1);
            }

            res.channelData?.channelMessages.push({
              messageid: msg.messageid,
              messagesender: msg.user,
              messagetext: msg.messagetext,
              username: msg.username,
            });

            setMessage(res.channelData?.channelMessages);
          }
        });

        channel.bind("deletemessage", (data: any) => {
          const message = JSON.parse(data.message);

          const msg: {
            channelid: number;
            messageid: number;
          } = message.message;

          if (Number(msg.channelid) == Number(props.channelid)) {
            const indexOfMessage = res.channelData?.channelMessages.findIndex(
              (message) => message.messageid === msg.messageid
            );

            if ((indexOfMessage as any) > -1) {
              res.channelData?.channelMessages.splice(indexOfMessage as any, 1);
            }

            setMessage(res.channelData?.channelMessages);
          }
        });
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
