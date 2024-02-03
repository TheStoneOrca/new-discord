"use client";

import UseAPIUser from "@/hooks/useUser";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import GroupCard from "./__components/groupcard";

export default function Page() {
  const { isReady, userData, isLoggedIn } = UseAPIUser();

  return (
    <div className="bg-white h-[897px] w-full">
      {userData ? (
        userData.groups.map((group: any) => (
          <div key={group.groupid as any}>
            <GroupCard
              profile={group.groupprofile}
              name={group.groupname}
              id={group.groupid}
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
  );
}
