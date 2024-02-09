"use client";

import GetAllUsersFromGroup from "@/actions/getallgroupmembers";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateUserDropdown from "./updateuser";

export default function UserCard(props: {
  username: string;
  userprofile: string;
  userrole: string;
  groupid: number;
}) {
  const [users, setUser] = useState<Array<any>>();

  useEffect(() => {
    GetAllUsersFromGroup(props.groupid).then((res) => {
      if (!res.error) {
        console.log(res.users);
        setUser(res.users);
      }
    });
  }, []);
  return (
    <div>
      <Card className="w-64 h-64">
        <CardHeader>
          <CardTitle>Group Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users ? (
            <div>
              {users.map((user) => (
                <div className="flex mb-2">
                  <UpdateUserDropdown profile={user.profile as any} />
                  <Label className="ml-2">{user.username}</Label>
                </div>
              ))}
            </div>
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
