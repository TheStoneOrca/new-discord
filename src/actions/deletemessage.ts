"use server";

import pg from "pg";
import Pusher from "pusher";

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

    const deletedRows = await db.query(
      "DELETE FROM messages WHERE messageid = $1 RETURNING *",
      [props.messageid]
    );

    const pusher = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as any,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as any,
      secret: process.env.NEXT_PUBLIC_PUSHER_SECRET as any,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as any,
      useTLS: true,
    });

    const messageData = {
      messageid: props.messageid,
      channelid: deletedRows.rows[0].messagesentin,
    };

    await pusher.trigger("messages", "deletemessage", {
      message: `${JSON.stringify({ message: messageData })}\n\n`,
    });

    await db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
