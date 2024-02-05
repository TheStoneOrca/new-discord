"use server";

import pg from "pg";
import io from "socket.io-client";

export default async function CreateMessage(data: FormData) {
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
      "INSERT INTO messages(messagetext, messagesender, messagesentin, messagegroup) VALUES($1, $2, $3, $4) RETURNING *",
      [
        data.get("messagetext"),
        data.get("messagesender"),
        data.get("messagesentin"),
        data.get("messagegroup"),
      ]
    );

    const socket = io("http://localhost:3000");

    socket.emit("sendmessage", {
      messagecontent: data.get("messagetext"),
      messagesender: data.get("messagesender"),
      messagegroup: data.get("messagegroup"),
    });

    socket.disconnect();

    return { success: true, messageData: message.rows[0] };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
