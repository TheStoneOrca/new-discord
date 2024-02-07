"use client";

import GetCatergories from "@/actions/getcatergories";
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigUp,
  Loader2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Channels from "./channels";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Catergories(props: { groupid: number }) {
  const [catergories, setCatergories] = useState<any>();
  const [channels, showChannels] = useState<boolean>(true);

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
                <Button
                  variant="ghost"
                  className="text-lg w-full justify-start"
                  onClick={() => showChannels(!channels)}
                >
                  {catergory.catergoryname}
                  {channels ? <ArrowBigDown /> : <ArrowBigLeft />}
                </Button>
                {channels && (
                  <div>
                    <Channels
                      channelcatergory={catergory.catergoryid}
                      channelgroup={catergory.catergorygroup}
                    />
                  </div>
                )}
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
