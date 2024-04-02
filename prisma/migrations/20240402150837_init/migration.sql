-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'DONE', 'IN_PROGRESS', 'PAUSED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('RED', 'YELLOW', 'BLUE');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "priority" "Priority" NOT NULL,
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
