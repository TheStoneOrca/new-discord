"use client";

import UseAPIUser from "@/hooks/useUser";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import GroupCard from "./__components/groupcard";

export default function Page() {
  const { isReady, userData, isLoggedIn } = UseAPIUser();

  return (
    <div className="bg-white h-[897px] w-full dark:bg-black">
      <h1 className="text-black dark:text-white mb-2">Your Groups</h1>
      <div className="flex">
        {userData ? (
          userData.groups.map((group: any) => (
            <div key={group.groupid as any} className="mr-10">
              <GroupCard
                profile={group.groupprofile}
                name={group.groupname}
                id={group.groupid}
                groupdesc={group.groupdesc}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center text-black">
            <p>Loading, please wait...</p>
            <Loader2Icon className="animate-spin flex items-center" />
          </div>
        )}
      </div>
    </div>
  );
}
