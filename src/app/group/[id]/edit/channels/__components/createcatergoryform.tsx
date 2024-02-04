"use client";

import CreateCatergory from "@/actions/createcatergory";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateCatergoryButton(props: { groupid: number }) {
  const [input, showInput] = useState<boolean>();
  const [error, setError] = useState<any>();
  return (
    <form
      action={(data: FormData) => {
        CreateCatergory(data).then((res) => {
          if (res.error) {
            setError(res.error);
          } else {
            window.location.reload();
          }
        });
      }}
    >
      {input && (
        <div>
          <Label>Catergory Name</Label>
          <div className="flex">
            <Input name="catergoryname" type="text" className="w-30" required />
            <Input type="submit" value="create" className="w-30" />
          </div>
        </div>
      )}

      <Input type="hidden" name="groupid" value={props.groupid} />

      <Button variant="ghost" type="button" onClick={() => showInput(!input)}>
        <Plus className="text-black" />
      </Button>

      {error && <h1>{error}</h1>}
    </form>
  );
}
