const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { query } = req.query;
  if (req.method == "GET") {
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: query,
        },
      });
      console.log(data);
      if (data) {
        res.status(200).json(true);
      }
      else{
        res.status(200).json(false)
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
