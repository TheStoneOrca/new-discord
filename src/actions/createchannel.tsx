"use server";

import pg from "pg";

export default async function CreateChannel(data: FormData) {
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
      "INSERT INTO channels(channelname, channelcatergory, channelgroup) VALUES($1, $2, $3)",
      [
        data.get("channel-name"),
        data.get("catergoryid"),
        data.get("catergorygroup"),
      ]
    );

    await db.end();

    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
