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

export default function Settings(props: { groupid: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <SettingsIcon className="text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-black">
        <DropdownMenuLabel>Group Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/group/${props.groupid}/edit/settings`}>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/group/${props.groupid}/edit/channels`}>Channels</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
