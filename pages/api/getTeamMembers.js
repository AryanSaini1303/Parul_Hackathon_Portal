import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { teamId } = req.query;
    try {
      const response = await prisma.user.findMany({
        where: {
          teamId: teamId,
        },
        select: {
          name: true,
          email: true,
          teamName: true,
          teamId: true,
          role: true,
        },
        orderBy:{
          role:'asc'
        }
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
