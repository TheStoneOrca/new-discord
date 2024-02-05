"use server";

import pg from "pg";

export default async function DeleteMessage(props: { messageid: number }) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    await db.query("DELETE FROM messages WHERE messageid = $1", [
      props.messageid,
    ]);

    await db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
