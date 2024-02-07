"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function AlreadyJoinedCard() {
  return (
    <div>
      <Card className="w-80 h-[25rem]">
        <CardHeader>
          <CardTitle>Already Joined</CardTitle>
          <CardDescription>You Have Already Joined This Group</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/home">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
