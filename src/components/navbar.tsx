"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import UserProfileButton from "./profilemanager";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

export default function Navbar() {
  const { isLoaded, user, isSignedIn } = useUser();
  return (
    <div className="w-full flex">
      <NavigationMenu className="w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/home" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/groups" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Groups
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/group/create" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="absolute left-[1870px]">
        {isLoaded ? (
          isSignedIn ? (
            <div className="mt-1">
              <UserProfileButton imgUrl={user.imageUrl} />
            </div>
          ) : null
        ) : (
          <Loader2Icon className="animate-spin text-gray-500" />
        )}
      </div>
      {isLoaded && !isSignedIn && (
        <div className="absolute left-[1835px] mt-1 ml-0 mr-0">
          <SignInButton>
            <Button variant="outline" className="dark:text-white text-black">
              Sign In
            </Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}
