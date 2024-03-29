"use server";

import pg from "pg";

export default async function CheckUser(userid: string, groupid: number) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    const group = await db.query("SELECT * FROM groups WHERE groupid = $1", [
      groupid,
    ]);

    await db.end();

    if (group.rows.length <= 0) {
      return { error: "No group found" };
    }

    return group.rows[0].groupcreator === userid;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
