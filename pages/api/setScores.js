import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { scores, teamId } = req.query;

    // Parse scores if it is a stringified object
    const parsedScores = JSON.parse(scores);
    console.log("parsedScores", parsedScores);
    try {
      const response = await prisma.Evaluation.update({
        where: { teamId: teamId },
        data: {
          Innovation: parseFloat(parsedScores.Innovation),
          Uniqueness: parseFloat(parsedScores.Uniqueness),
          Feasibility: parseFloat(parsedScores.Feasibility),
          Presentation: parseFloat(parsedScores.Presentation),
          Readiness: parseFloat(parsedScores.Readiness),
        },
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }
}
