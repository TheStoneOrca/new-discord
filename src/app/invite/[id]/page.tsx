"use client";

import { useParams } from "next/navigation";
import InviteCard from "./__components/invitecard";
import { useEffect, useState } from "react";
import GetInvite from "@/actions/getinvitedata";
import NotFoundPage from "@/app/not-found";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import CheckIfJoined from "@/actions/checkifjoined";
import AlreadyJoinedCard from "./__components/alreadyjoined";

export default function InviteLinkPage() {
  const [inviteData, setInviteData] = useState<any>();
  const [alreadyJoined, setAlreadyJoined] = useState<boolean>();
  const [loaded, setLoaded] = useState<boolean>();

  const { id } = useParams();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!user || !isLoaded) return;
    GetInvite(Number(id)).then((res) => {
      if (res.error) {
        return <NotFoundPage />;
      } else {
        CheckIfJoined({ groupid: res.data.groupid, userid: user.id }).then(
          (result) => {
            if (result.errror) {
              window.location.href = "/";
            } else if (result.joined === true) {
              setLoaded(true);
              setAlreadyJoined(true);
            } else if (result.joined === false) {
              setLoaded(true);
              setInviteData(res.data);
            }
          }
        );
      }
    });
  }, [isLoaded]);

  return (
    <div>
      {loaded && user ? (
        <div>
          {inviteData && (
            <div className="flex justify-center">
              <InviteCard
                userid={user.id}
                groupdesc={inviteData.groupdesc}
                groupid={inviteData.groupid}
                groupimg={inviteData.groupprofile}
                groupname={inviteData.groupname}
              />
            </div>
          )}

          {alreadyJoined && (
            <div className="flex justify-center">
              <AlreadyJoinedCard />
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </div>
  );
}
