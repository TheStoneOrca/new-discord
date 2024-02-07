"use client";

import CheckIfJoined from "@/actions/checkifjoined";
import UseAPIUser from "@/hooks/useUser";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./__components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  useEffect(() => {
    if (!isLoaded || !user) return;
    CheckIfJoined({
      groupid: Number(id),
      userid: user.id,
    }).then((res) => {
      if (res.errror) {
        window.location.href = "/home";
      } else if (res.joined === false) {
        window.location.href = "/home";
      }
    });
  }, [isLoaded]);

  return (
    <div>
      <Sidebar groupid={id as any} /> {children}
    </div>
  );
}
