"use server";

import pg from "pg";

export default async function GetCatergories(props: { groupid: number }) {
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
      "SELECT * FROM catergories WHERE catergorygroup = $1 ORDER BY catergorynumber",
      [props.groupid]
    );

    await db.end();

    return { catergories: catergories.rows };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
