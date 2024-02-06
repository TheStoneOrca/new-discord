"use client";

import GetAllGroups from "@/actions/getallgroups";
import GetSpecificGroup from "@/actions/getspecificgroup";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GroupCard from "./__components/groupcard";
import { Loader2Icon } from "lucide-react";
import SearchBar from "./__components/searchbar";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any>();

  const params = useSearchParams();
  const searchQuery = params.get("q");

  useEffect(() => {
    if (searchQuery) {
      GetSpecificGroup(searchQuery.replace(/^['"]|['"]$/g, "")).then(
        (res: any) => {
          if (res.error || res.groups === null) {
            notFound();
          } else if (res.groups) {
            setGroups(res.groups);
          }
        }
      );
    } else {
      GetAllGroups().then((res: any) => {
        if (res.error || res.groups === null) {
          setGroups(null);
        } else if (res.groups) {
          setGroups(res.groups);
        }
      });
    }
  }, [searchQuery]);

  return (
    <div className="flex">
      <SearchBar />
      {groups ? (
        <div className="flex">
          {groups.map((group: any) => (
            <div key={group.groupid}>
              <GroupCard
                profile={group.groupprofile}
                name={group.groupname}
                id={group.groupid}
                groupdesc={group.groupdesc}
              />
            </div>
          ))}
        </div>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
