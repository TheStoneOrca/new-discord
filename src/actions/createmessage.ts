"use server";

import pg from "pg";

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

    return { success: true, messageData: message.rows[0] };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
