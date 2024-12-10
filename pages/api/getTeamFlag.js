import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { email } = req.query;
  if (req.method == "GET") {
    try {
      const response = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
