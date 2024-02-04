"use client";

import CheckUser from "@/actions/checkowner";
import UseAPIUser from "@/hooks/useUser";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Settings from "./__components/settings";
import Catergories from "./__components/catergories";

export default function GroupsPage() {
  const [owner, isOwner] = useState<boolean>(false);
  const { isLoggedIn, isReady, userData } = UseAPIUser();

  const { id } = useParams();

  useEffect(() => {
    if (!isReady) return;
    CheckUser(userData.user.userid, id as any).then((res: any) => {
      if (res === true) {
        isOwner(true);
      } else {
        isOwner(false);
      }
    });
  }, [isReady]);

  return (
    <div className="bg-white h-[897px] w-full dark:bg-black">
      {!isReady && <Loader2Icon className="text-black animate-spin" />}
      {owner && (
        <div>
          <Settings groupid={id as any} />
          <Catergories groupid={id as any} />
        </div>
      )}
    </div>
  );
}
