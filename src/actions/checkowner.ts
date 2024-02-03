"use server";

import pg from "pg";

export default async function CheckUser(userid: string, groupid: number) {
  try {
    const db = new pg.Client({
      connectionString:
        "postgresql://josephiannuzzelli4561:f5LIBtRr7OQF@ep-billowing-morning-02647692.us-east-2.aws.neon.tech/better-discord?sslmode=require",
    });

    await db.connect();

    const group = await db.query("SELECT * FROM groups WHERE groupid = $1", [
      groupid,
    ]);

    if (group.rows.length <= 0) {
      return { error: "No group found" };
    }

    return group.rows[0].groupcreator === userid;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
