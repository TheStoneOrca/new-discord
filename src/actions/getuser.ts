"use server";

import pg from "pg";

export default async function getUser(id: string) {
  try {
    const db = new pg.Client({
      connectionString:
        "postgresql://josephiannuzzelli4561:f5LIBtRr7OQF@ep-billowing-morning-02647692.us-east-2.aws.neon.tech/better-discord?sslmode=require",
    });

    await db.connect();

    const user = await db.query("SELECT * FROM users WHERE userid = $1", [id]);
    const groupsJoined = await db.query(
      "SELECT * FROM joins LEFT JOIN groups ON joins.joininggroup = groups.groupid LEFT JOIN Users ON joins.joiningperson = users.userid WHERE joiningperson = $1",
      [id]
    );

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
