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

    const catergories = await db.query(
      "SELECT * FROM catergories WHERE catergorygroup = $1",
      [data.get("groupid")]
    );

    await db.query(
      "INSERT INTO catergories(catergoryname, catergorygroup, catergorynumber) VALUES($1, $2, $3)",
      [
        data.get("catergoryname"),
        data.get("groupid"),
        catergories.rows.length + 1,
      ]
    );

    db.end();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
