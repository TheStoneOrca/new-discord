"use server";

import pg from "pg";

export default async function GetChannels(props: { channelcatergory: number }) {
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
      [props.channelcatergory]
    );

    await db.end();

    return { channels: channels.rows };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
