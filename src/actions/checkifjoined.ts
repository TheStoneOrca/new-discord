"use server";

import pg from "pg";

export default async function CheckIfJoined(props: {
  userid: string;
  groupid: number;
}) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });

    await db.connect();

    const check = await db.query(
      "SELECT * FROM joins WHERE joininggroup = $1 AND joiningperson = $2",
      [props.groupid, props.userid]
    );

    if (check.rows.length > 0) {
      await db.end();

      return { joined: true };
    } else {
      await db.end();

      return { joined: false };
    }
  } catch (error) {
    console.error(error);
    return { errror: error };
  }
}
