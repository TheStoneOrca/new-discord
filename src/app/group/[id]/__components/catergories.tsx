"use client";

import GetCatergories from "@/actions/getcatergories";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Channels from "./channels";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function Catergories(props: { groupid: number }) {
  const [catergories, setCatergories] = useState<any>();

  useEffect(() => {
    GetCatergories({ groupid: props.groupid as any }).then((res: any) => {
      if (res.catergories) {
        setCatergories(res.catergories);
      } else {
        setCatergories(false);
      }
    });
  }, []);

  return (
    <>
      {catergories ? (
        <div>
          {catergories !== null && catergories === false && (
            <h1 className="text-black">No Catergories</h1>
          )}
          {catergories !== null && catergories.length <= 0 && (
            <h1 className="text-black">No Catergories</h1>
          )}
          {catergories !== null &&
            catergories.length > 0 &&
            catergories.map((catergory: any) => (
              <div
                className="text-black dark:text-white"
                key={catergory.catergoryid}
              >
                <h1 className="flex underline">{catergory.catergoryname}</h1>
                <Channels
                  channelcatergory={catergory.catergoryid}
                  channelgroup={catergory.catergorygroup}
                />
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader2Icon className="animate-spin text-black w-40 h-40" />
        </div>
      )}
    </>
  );
}
