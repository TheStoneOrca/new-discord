"use client";

import JoinGroup from "@/actions/joingroup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function InviteCard(props: {
  groupname: string;
  groupid: number;
  groupimg: string;
  groupdesc: string;
  userid: string;
}) {
  const [error, setError] = useState<string>();

  return (
    <div>
      <Card className="w-80 h-[25rem]">
        <CardHeader>
          <CardTitle>{props.groupname}</CardTitle>
          <CardDescription>{props.groupdesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={props.groupimg} width={270} height={30} alt="group-img" />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              JoinGroup({ groupid: props.groupid, userid: props.userid }).then(
                (res) => {
                  if (res.error) {
                    setError("Unexpected error while joining!");
                  } else {
                    window.location.href = `/group/${props.groupid}`;
                  }
                }
              );
            }}
          >
            Join
          </Button>
          {error && <h1>{error}</h1>}
        </CardFooter>
      </Card>
    </div>
  );
}
