"use server";

import pg from "pg";

export default async function GetInvite(inviteid: number) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    const inviteData = await db.query(
      "SELECT * FROM invitelinks JOIN groups ON invitelinks.joining = groups.groupid  WHERE linkid = $1 ",
      [inviteid]
    );

    await db.end();

    if (inviteData.rows.length > 0) {
      return { data: inviteData.rows[0] };
    } else {
      return { data: null };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
