import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.url) return res.status(404);
    const prisma = new PrismaClient();

    const userid = req.url.slice(req.url.lastIndexOf("/") + 1);

    const user = await prisma.users.findUnique({
      where: {
        userid: userid,
      },
    });

    if (user) {
      return res.json({ userJWT: user });
    } else {
      return res.status(401);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}
