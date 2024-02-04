"use server";

import pg from "pg";

export default async function CreateGroup(data: FormData) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

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

    const Group = await db.query(
      "INSERT INTO groups(groupname, grouprules, groupprofile, groupcreator, groupdesc) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        data.get("groupname") as string,
        data.get("grouprules") as string,
        icon.secure_url,
        data.get("groupcreator") as string,
        data.get("groupdesc") as string,
      ]
    );

    await db.query(
      "INSERT INTO joins(joininggroup, joiningperson, role) VALUES($1, $2, $3)",
      [Group.rows[0].groupid, data.get("groupcreator") as string, "Owner"]
    );

    await db.end();

    return { groupid: Group.rows[0].groupid };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
