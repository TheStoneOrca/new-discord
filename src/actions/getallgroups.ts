"use server";

import pg from "pg";

export default async function GetAllGroups() {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });
    await db.connect();

    const groups = await db.query("SELECT * FROM groups");

    if (groups.rows.length > 0) {
      await db.end();

      return { groups: groups.rows };
    } else {
      await db.end();

      return { groups: null };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
