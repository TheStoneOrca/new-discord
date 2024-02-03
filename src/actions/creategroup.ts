"use server";

import { PrismaClient } from "@prisma/client";

export default async function CreateGroup(data: FormData) {
  try {
    const prisma = new PrismaClient();

    if (!data) return { error: "No formdata" };

    const iconData = new FormData();
    iconData.append("file", data.get("group-profile") as string);
    iconData.append("upload_preset", "n3gm5qgo");

    const unJsonedData = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      {
        method: "POST",
        body: iconData,
      }
    );

    const icon = await unJsonedData.json();

    const Group = await prisma.groups.create({
      data: {
        groupname: data.get("groupname") as string,
        grouprules: data.get("grouprules") as string,
        groupprofile: icon.secure_url,
        groupcreator: data.get("groupcreator") as string,
      },
    });

    return { groupid: Group.groupid };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
