"use server";

import pg from "pg";

export default async function CreateServerLink(groupid: number) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    const invitelink = await db.query(
      "INSERT INTO invitelinks(joining, datecreated) VALUES($1, $2) RETURNING *",
      [groupid, new Date().getDate()]
    );

    await db.end();
    return { inviteid: invitelink.rows[0].linkid };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
