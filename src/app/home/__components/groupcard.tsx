"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function GroupCard(props: {
  profile: string;
  name: string;
  id: number;
  groupdesc: string;
}) {
  return (
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
        <Button variant="outline" asChild className="w-full">
          <Link href={`/group/${props.id}`}>Go To</Link>
        </Button>
      </div>
    </Card>
  );
}
