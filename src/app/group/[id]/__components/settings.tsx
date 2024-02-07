"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CreateInviteCard from "./createinvitecard";

export default function Settings(props: { groupid: number }) {
  const [invite, showInvite] = useState<boolean>();

  return (
    <div>
      {invite && (
        <div className="absolute left-[40%] top-64">
          <CreateInviteCard
            groupid={props.groupid}
            closeCardFunction={showInvite}
          />
        </div>
      )}{" "}
      <div className="absolute left-[97%]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <SettingsIcon className="text-black dark:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-black">
            <DropdownMenuLabel>Group Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/group/${props.groupid}/edit/members`}>
                  Members
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/group/${props.groupid}/edit/channels`}>
                  Channels
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  showInvite(!invite);
                }}
              >
                Create Invite
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
