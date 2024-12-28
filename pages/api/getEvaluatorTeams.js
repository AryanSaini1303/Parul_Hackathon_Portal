import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { email } = req.query;
    try {
      const response = await prisma.Evaluation.findMany({
        where: { evaluatorEmail: email },
      });
      res.status(200).json(response)
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }
}
