"use client";

import { useParams } from "next/navigation";
import Catergories from "./__components/catergories";
import CreateCatergoryButton from "./__components/createcatergoryform";

export default function ChannelEditingPage() {
  const { id } = useParams();

  return (
    <div className="bg-white h-[897px] w-full">
      <Catergories groupid={id as any} />
      <CreateCatergoryButton groupid={id as any} />
    </div>
  );
}
