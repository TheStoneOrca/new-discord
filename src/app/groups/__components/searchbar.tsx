"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div>
      <form
        action={(data: FormData) => {
          window.location.href = `/groups?q=${data.get("searchinput")}`;
        }}
      >
        <Input type="text" name="searchinput" required />
        <Input type="submit" value="Search" />
      </form>
    </div>
  );
}
