"use server";

import pg from "pg";

export default async function GetChannel(props: { channelid: number }) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    const channel = await db.query(
      "SELECT * FROM channels WHERE channelid = $1",
      [props.channelid]
    );

    if (channel.rows.length > 0) {
      const messages = await db.query(
        "SELECT * FROM messages JOIN users ON messages.messagesender = users.userid WHERE messagesentin = $1",
        [props.channelid]
      );

      await db.end();

      return {
        channelData: {
          channelInfo: channel.rows[0],
          channelMessages: messages.rows,
        },
      };
    } else {
      await db.end();

      return { channelData: null };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
