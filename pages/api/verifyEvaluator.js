import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { email } = req.query;
    try {
      const response = await prisma.Evaluation.findMany({
        where: { evaluatorEmail: email },
        select: {
          teamName: true,
        },
      });
      console.log(response);
      response.length!=0 ? res.status(200).json(true):res.status(200).json(false);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }
}