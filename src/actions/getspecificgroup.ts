"use server";

import pg from "pg";

export default async function GetSpecificGroup(searchQuery: String) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });
    await db.connect();

    const specificGroups = await db.query(
      "SELECT * FROM groups WHERE LOWER(groupname) LIKE LOWER($1)",
      [`%${searchQuery}%`]
    );

    if (specificGroups.rows.length > 0) {
      await db.end();

      return { groups: specificGroups.rows };
    } else {
      await db.end();

      return { groups: null };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
