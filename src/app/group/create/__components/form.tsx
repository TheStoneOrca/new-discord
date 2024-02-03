"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import RulesForm from "./rulesform";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import CreateGroup from "@/actions/creategroup";

export default function GroupCreateForm() {
  const { isLoaded, user, isSignedIn } = useUser();
  const [rules, setRules] = useState<string>("");

  return (
    <div>
      {isLoaded && isSignedIn && user ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create A Group</CardTitle>
            <CardDescription>
              Create A Public or Private Group To Chat With Others!
            </CardDescription>
          </CardHeader>
          <form action={CreateGroup}>
            <Label>Group Name</Label>
            <Input
              type="text"
              name="groupname"
              placeholder="Group Name"
              required
            />

            <Label>Group Rules</Label>
            <RulesForm setRules={setRules} />
            <Input type="hidden" name="grouprules" value={rules} required />

            <Input type="file" name="group-profile" />
            <Input type="hidden" name="groupcreator" value={user.id} />

            <Input type="submit" value="submit" />
          </form>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex justify-center">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
    </div>
  );
}
