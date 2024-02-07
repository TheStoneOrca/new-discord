"use client";

import CheckIfJoined from "@/actions/checkifjoined";
import JoinGroup from "@/actions/joingroup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GroupCard(props: {
  profile: string;
  name: string;
  id: number;
  groupdesc: string;
}) {
  const [isJoined, setIsJoined] = useState<boolean>();
  const { isLoaded, user } = useUser();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;
    CheckIfJoined({ userid: user.id, groupid: props.id }).then((res) => {
      if (res.joined === true) {
        setIsJoined(true);
      } else if (res.joined === false || res.errror) {
        setIsJoined(false);
      }
    });
  }, [isLoaded]);

  return (
    <div>
      {isLoaded && user ? (
        <div>
          <Card className="w-64 h-64">
            <CardHeader>
              <CardTitle>{props.name}</CardTitle>
              <CardDescription>{props.groupdesc}</CardDescription>
            </CardHeader>
            <div className="flex justify-center">
              <Image
                src={props.profile}
                width={260}
                height={100}
                className="w-full"
                alt="groupimg"
              />
            </div>
            <div className="flex justify-center">
              {isJoined && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/group/${props.id}`}>Go To</Link>
                </Button>
              )}

              {!isJoined && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    JoinGroup({ groupid: props.id, userid: user.id }).then(
                      (res) => {
                        if (res.success) {
                          window.location.href = `/group/${props.id}`;
                        } else {
                          setError(
                            "Unexpected Error while joining. Please wait as we get this fixed."
                          );
                        }
                      }
                    );
                  }}
                >
                  Join
                </Button>
              )}
            </div>
            <CardFooter>{error && <h1>{error}</h1>}</CardFooter>
          </Card>
        </div>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
