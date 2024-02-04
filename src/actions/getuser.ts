"use server";

import pg from "pg";

export default async function getUser(id: string) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });
    await db.connect();

    const user = await db.query("SELECT * FROM users WHERE userid = $1", [id]);
    const groupsJoined = await db.query(
      "SELECT * FROM joins LEFT JOIN groups ON joins.joininggroup = groups.groupid LEFT JOIN Users ON joins.joiningperson = users.userid WHERE joiningperson = $1",
      [id]
    );

    await db.end();

    if (user) {
      return { userInfo: { user: user.rows[0], groups: groupsJoined.rows } };
    } else {
      return { useInfo: null };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
