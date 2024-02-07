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
import UseAPIUser from "@/hooks/useUser";

export default function GroupCreateForm() {
  const { isLoaded, user, isSignedIn } = useUser();
  const [rules, setRules] = useState<string>("");
  const [error, setError] = useState<string>();

  return (
    <div className="flex justify-center">
      {isLoaded && isSignedIn && user ? (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Create A Group</CardTitle>
            <CardDescription>
              Create A Public or Private Group To Chat With Others!
            </CardDescription>
          </CardHeader>
          <form
            action={(formData) => {
              CreateGroup(formData).then((res) => {
                if (res.error) {
                  setError(
                    "Unexpected Error while creating. Please try again later."
                  );
                } else {
                  window.location.href = `/group/${res.groupid}`;
                }
              });
            }}
          >
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

            <Label>Group Description</Label>
            <Input type="text" name="groupdesc" required />

            <Input type="file" name="group-profile" />
            <Input type="hidden" name="groupcreator" value={user.id} />

            <Input type="submit" value="submit" />
          </form>
          <CardFooter>
            {error && <h1 className="text-red">{error}</h1>}
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
