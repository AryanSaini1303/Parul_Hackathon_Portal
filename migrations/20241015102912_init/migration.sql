/*
  Warnings:

  - You are about to drop the column `link` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "link",
DROP COLUMN "role",
DROP COLUMN "teamName",
ADD COLUMN     "screenshotLink" TEXT;
