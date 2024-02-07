"use client";

import CreateServerLink from "@/actions/createinvite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateInviteCard(props: {
  groupid: number;
  closeCardFunction: any;
}) {
  const [inviteLink, setInviteLink] = useState<string>("");

  useEffect(() => {
    CreateServerLink(props.groupid).then((res) => {
      if (res.error) {
        setInviteLink("Unexpected Error");
      } else {
        setInviteLink(`${process.env.WEBSITE_DOMAIN}/invite/${res.inviteid}`);
      }
    });
  }, []);

  function ResetInviteLink() {
    CreateServerLink(props.groupid).then((res) => {
      if (res.error) {
        setInviteLink("Unexpected Error");
      } else {
        setInviteLink(`${process.env.WEBSITE_DOMAIN}/invite/${res.inviteid}`);
      }
    });
  }

  return (
    <Card className="w-72 h-72">
      <CardHeader>
        <CardTitle className="mr-3">Your invite link!</CardTitle>
        <CardDescription>
          Send this to someone to invite them to the server!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="text" value={inviteLink} className="mb-3" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          onClick={() => props.closeCardFunction(false)}
        >
          <X className="text-white" />
        </Button>
        <Button onClick={() => ResetInviteLink()}>
          <RefreshCcw />
        </Button>
      </CardFooter>
    </Card>
  );
}
