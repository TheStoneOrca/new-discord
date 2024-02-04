"use client";

import CreateChannel from "@/actions/createchannel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateChannelButton(props: {
  catergoryid: number;
  groupid: number;
}) {
  const [input, showInput] = useState<boolean>();
  const [error, setError] = useState<string>();

  return (
    <div>
      <form
        action={(data: FormData) => {
          CreateChannel(data).then((res) => {
            if (res.error) {
              setError(error);
            } else {
              window.location.reload();
            }
          });
        }}
      >
        {input && (
          <div>
            <Label>Channel Name</Label>
            <div className="flex text-white">
              <Input
                type="text"
                name="channel-name"
                className="w-30"
                required
              />
              <Input type="submit" value="create" className="w-30" />
            </div>
          </div>
        )}

        <input type="hidden" name="catergoryid" value={props.catergoryid} />
        <input type="hidden" name="catergorygroup" value={props.groupid} />

        <Button variant="ghost" type="button" onClick={() => showInput(!input)}>
          <Plus className="text-black" />
        </Button>
      </form>
    </div>
  );
}
