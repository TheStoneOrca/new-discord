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

    const channels = await db.query(
      "SELECT * FROM channels WHERE channelcatergory = $1",
      [data.get("catergoryid")]
    );

    await db.query(
      "INSERT INTO channels(channelname, channelcatergory, channelgroup, channelnumber, channeltype) VALUES($1, $2, $3, $4, $5)",
      [
        data.get("channel-name"),
        data.get("catergoryid"),
        data.get("catergorygroup"),
        channels.rows.length + 1,
        data.get("channeltype"),
      ]
    );

    await db.end();

    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
