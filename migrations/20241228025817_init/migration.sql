-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "evaluatorName" TEXT NOT NULL,
    "evaluatorEmail" TEXT NOT NULL,
    "Innovation" DOUBLE PRECISION NOT NULL,
    "Uniqueness" DOUBLE PRECISION NOT NULL,
    "Feasibility" DOUBLE PRECISION NOT NULL,
    "Presentation" DOUBLE PRECISION NOT NULL,
    "Readiness" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);
