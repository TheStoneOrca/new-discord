"use client";

import CheckUser from "@/actions/checkowner";
import UseAPIUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isReady, userData } = UseAPIUser();
  const { id } = useParams();

  useEffect(() => {
    function HandleWebpageLeave(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = "");
    }

    window.addEventListener("beforeunload", HandleWebpageLeave);

    return () => {
      window.removeEventListener("beforeunload", HandleWebpageLeave);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (!isLoggedIn) window.location.href = `/group/${id}`;
    CheckUser(userData.user.userid, id as any).then((res) => {
      if (res === false) {
        window.location.href = `/group/${id}`;
      }
    });
  }, [isReady]);

  return <div>{children}</div>;
}
