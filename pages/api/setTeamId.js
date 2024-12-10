import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  let { email, teamId, teamName } = req.query;
  if (req.method == "POST") {
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          teamId: teamId,
          teamName: teamName,
          role: "Leader",
        },
      });
      res.status(200).json("ok");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
