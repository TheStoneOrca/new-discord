"use server";

import pg from "pg";

export default async function CreateCatergory(data: FormData) {
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
      "INSERT INTO catergories(catergoryname, catergorygroup) VALUES($1, $2)",
      [data.get("catergoryname"), data.get("groupid")]
    );

    db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
