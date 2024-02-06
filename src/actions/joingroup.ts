"use server";

import pg from "pg";

export default async function JoinGroup(props: {
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

    await db.query(
      "INSERT INTO joins(joininggroup, joiningperson, role) VALUES($1, $2, $3)",
      [props.groupid, props.userid, "member"]
    );

    await db.end();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
