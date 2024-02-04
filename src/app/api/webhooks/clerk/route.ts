import { Webhook } from "svix";
import { headers } from "next/headers";
import { Clerk, WebhookEvent } from "@clerk/nextjs/server";
import pg from "pg";

export async function POST(req: Request) {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: "Domg0730",
      port: 5432,
      database: "better-discord",
    });
    await db.connect();
    console.log("connected to db");

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const emails = evt.data.email_addresses.map((email) => {
        return email.email_address;
      });

      if (!evt.data.username) return;

      await db.query(
        "INSERT INTO users(userid, username, userrole, profile, email, fname, lname, bio, pronouns) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          evt.data.id,
          evt.data.username,
          "member",
          evt.data.image_url,
          emails,
          evt.data.first_name,
          evt.data.last_name,
          "This is your new account! Checkout the rules <a href='/rules'>here!</a>",
          "",
        ]
      );
    } else if (eventType === "user.deleted") {
      await db.query("DELETE FROM users WHERE userid = $1", [evt.data.id]);
    }
  } catch (error) {
    console.error(error);
  }

  return new Response("", { status: 200 });
}
