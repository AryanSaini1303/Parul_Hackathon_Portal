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
        select:{
          teamId:true,
        }
      });
      console.log(data);
      if (data) {
        res.status(200).json({data:data, message:true});
      }
      else{
        res.status(200).json({message:false})
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
