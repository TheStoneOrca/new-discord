"use server";

import { PrismaClient } from "@prisma/client";

export default async function getUser(id: string) {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.users.findUnique({
      where: {
        userid: id,
      },
    });

    if (user) {
      return { user: user };
    } else {
      return { user: null };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
