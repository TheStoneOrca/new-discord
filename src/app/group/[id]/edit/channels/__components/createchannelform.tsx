"use client";

import CreateChannel from "@/actions/createchannel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
          <div className="text-black dark:text-white">
            <br />
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

            <Select name="channeltype" required>
              <SelectTrigger>
                <SelectValue placeholder="Select A Channel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Channel Types</SelectLabel>
                  <SelectItem value="text">Text Channel</SelectItem>
                  <SelectItem value="voice">Voice Channel</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <input type="hidden" name="catergoryid" value={props.catergoryid} />
        <input type="hidden" name="catergorygroup" value={props.groupid} />

        <Button
          variant="ghost"
          type="button"
          onClick={() => showInput(!input)}
          className="w-[45px] h-[30px]"
        >
          <Plus className="text-black dark:text-white w-full h-full" />
        </Button>
      </form>
    </div>
  );
}
