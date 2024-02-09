"use client";

import { useParams } from "next/navigation";
import UserCard from "./__components/usercard";

export default function EditMembersPage() {
  const { id } = useParams();

  return (
    <div className="flex justify-center">
      <UserCard username="" userprofile="" userrole="" groupid={id as any} />
    </div>
  );
}
