"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="absolute top-1 left-[600px]">
      <form
        action={(data: FormData) => {
          window.location.href = `/groups?q=${data.get("searchinput")}`;
        }}
      >
        <div className="flex">
          <Input type="text" name="searchinput" required />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </div>
      </form>
    </div>
  );
}
