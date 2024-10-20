-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "game" TEXT NOT NULL,
    "quiz" TEXT,
    "tasks" TEXT,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);
