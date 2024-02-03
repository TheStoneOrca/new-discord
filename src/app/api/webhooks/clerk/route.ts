import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

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

    await prisma.users.create({
      data: {
        userid: evt.data.id,
        username: evt.data.username,
        userrole: "member",
        profile: evt.data.image_url,
        email: emails,
        fname: evt.data.first_name,
        lname: evt.data.last_name,
        bio: "This is your new account! Checkout the rules <a href='/rules'>here!</a>",
        pronouns: "",
      },
    });
  } else if (eventType === "user.deleted") {
    await prisma.users.delete({
      where: {
        userid: evt.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
