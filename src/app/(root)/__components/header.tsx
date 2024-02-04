"use client";

import UserProfileButton from "@/components/profilemanager";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { Loader2Icon, LoaderIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { isLoaded, user, isSignedIn } = useUser();
  return (
    <div>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        The Latest and Greatest <br /> Social Media Platform
      </h1>
      <br />
      <div className="w-full h-[575px] bg-white dark:bg-black text-white">
        <span className="text-3xl font-bold">
          <h1 className="dark:text-white text-black">CocoCord</h1>

          <div className="flex justify-center">
            <div className="absolute bottom-[75px]">
              {!isLoaded && (
                <Button
                  disabled
                  variant="outline"
                  className="dark:text-white text-black"
                >
                  Please Wait
                  <LoaderIcon className="animate-spin ml-2" />
                </Button>
              )}

              {isLoaded && isSignedIn && (
                <Button
                  variant="outline"
                  className="dark:text-white text-black"
                  asChild
                >
                  <Link href="/home">Continue To App</Link>
                </Button>
              )}

              {isLoaded && !isSignedIn && (
                <Button
                  variant="outline"
                  className="dark:text-white text-black"
                  asChild
                >
                  <Link href="/login">Start Today</Link>
                </Button>
              )}
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}
