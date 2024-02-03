"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function GroupCard(props: {
  profile: string;
  name: string;
  id: number;
}) {
  return (
    <div className="bg-gray-500 w-64 h-64">
      <h1>{props.name}</h1>
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
    </div>
  );
}
