/*
  Warnings:

  - A unique constraint covering the columns `[teamName]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_teamName_key" ON "Leaderboard"("teamName");
