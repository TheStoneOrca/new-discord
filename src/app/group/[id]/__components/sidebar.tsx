"use client";

import Catergories from "./catergories";

export default function Sidebar(props: { groupid: number }) {
  return (
    <div className="absolute h-[897px] bg-[#0e1111] w-40">
      <div>
        <Catergories groupid={props.groupid} />
      </div>
    </div>
  );
}
