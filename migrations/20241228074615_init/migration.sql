/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `Evaluation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Evaluation_teamName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_teamId_key" ON "Evaluation"("teamId");
