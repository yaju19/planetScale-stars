import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createStar(req, res);
  } else if (req.method === "GET") {
    return await getAllStars(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function createStar(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.star.create({
      data: {
        name: body.name,
        constellation: body.constellation,
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating star", success: false });
  }
}
async function getAllStars(req, res) {
  try {
    const allStars = await prisma.star.findMany();
    return res.status(200).json(allStars);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating star", success: false });
  }
}
