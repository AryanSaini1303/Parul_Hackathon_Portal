/*
  Warnings:

  - A unique constraint covering the columns `[teamName]` on the table `Evaluation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_teamName_key" ON "Evaluation"("teamName");
