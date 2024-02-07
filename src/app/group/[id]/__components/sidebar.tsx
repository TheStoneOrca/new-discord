"use client";

import Catergories from "./catergories";

export default function Sidebar(props: { groupid: number }) {
  return (
    <div className="absolute h-[897px] md:h-[777px] bg-[#0e1111] w-40 overflow-y-auto">
      <div>
        <Catergories groupid={props.groupid} />
      </div>
    </div>
  );
}
