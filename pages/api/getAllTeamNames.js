import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const response = await prisma.user.findMany({
        select: {
          teamName: true,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
