"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function UpdateUserDropdown(props: { profile: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={props.profile} />
          <AvatarFallback>User's Profile</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>User Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form>
            <Button
              type="submit"
              variant="ghost"
              asChild
              className="w-full justify-start"
            >
              <DropdownMenuItem>Ban</DropdownMenuItem>
            </Button>
          </form>
          <form>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <DropdownMenuItem>Kick</DropdownMenuItem>
            </Button>
          </form>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <DropdownMenuItem>
              <Link href="#">Edit</Link>
            </DropdownMenuItem>
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
