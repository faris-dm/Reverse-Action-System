-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REJECTED', 'APPROVED', 'PENDIG');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
