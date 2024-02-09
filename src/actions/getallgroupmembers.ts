"use server";

import pg from "pg";

export default async function GetAllUsersFromGroup(groupid: number) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });
    await db.connect();

    const users = await db.query(
      "SELECT * FROM joins JOIN users ON joins.joiningperson = users.userid WHERE joins.joininggroup = $1",
      [groupid]
    );

    await db.end();

    return { users: users.rows };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
