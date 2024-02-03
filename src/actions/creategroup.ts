"use server";

import pg from "pg";

export default async function CreateGroup(data: FormData) {
  try {
    const db = new pg.Client({
      connectionString:
        "postgresql://josephiannuzzelli4561:f5LIBtRr7OQF@ep-billowing-morning-02647692.us-east-2.aws.neon.tech/better-discord?sslmode=require",
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
      "INSERT INTO groups(groupname, grouprules, groupprofile, groupcreator) VALUES($1, $2, $3, $4) RETURNING *",
      [
        data.get("groupname") as string,
        data.get("grouprules") as string,
        icon.secure_url,
        data.get("groupcreator") as string,
      ]
    );

    await db.query(
      "INSERT INTO joins(joininggroup, joiningperson, role) VALUES($1, $2, $3)",
      [Group.rows[0].groupid, data.get("groupcreator") as string, "Owner"]
    );

    return { groupid: Group.rows[0].groupid };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
