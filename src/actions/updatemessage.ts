"use server";

import pg from "pg";
import Pusher from "pusher";

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

    const message = await db.query(
      "UPDATE messages SET messagetext = $1 WHERE messageid = $2 RETURNING *",
      [data.get("messagetext"), data.get("messageid")]
    );

    const userData = await db.query("SELECT * FROM users WHERE userid = $1", [
      message.rows[0].messagesender,
    ]);

    await db.end();

    const pusher = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as any,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as any,
      secret: process.env.NEXT_PUBLIC_PUSHER_SECRET as any,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as any,
      useTLS: true,
    });

    const messageData = {
      messagetext: message.rows[0].messagetext,
      messageid: message.rows[0].messageid,
      channelid: message.rows[0].messagesentin,
      user: userData.rows[0].userid,
      username: userData.rows[0].username,
    };

    await pusher.trigger("messages", "editmessage", {
      message: `${JSON.stringify({ message: messageData })}\n\n`,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { errror: error };
  }
}
