import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  let { email, teamId, teamName, role } = req.query;
  if (req.method == "POST") {
    if (role == "Member") {
      try {
        const response = await prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            teamId: true,
            teamName: true,
          },
        });
        if (response.teamId) {
          res.status(200).json({message:"Already a member of a team", teamName:response.teamName});
          return;
        }
      } catch (error) {
        res.status(500).json(error.message);
        return;
      }
    }
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          teamId: teamId,
          teamName: teamName,
          role: role,
        },
      });
      res.status(200).json("ok");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
