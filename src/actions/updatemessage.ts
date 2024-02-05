"use server";

import pg from "pg";

export default async function UpdateMessage(data: FormData) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    await db.query(
      "UPDATE messages SET messagetext = $1 WHERE messageid = $2",
      [data.get("messagetext"), data.get("messageid")]
    );

    await db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { errror: error };
  }
}
