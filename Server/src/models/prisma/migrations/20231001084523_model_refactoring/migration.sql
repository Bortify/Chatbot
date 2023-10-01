/*
  Warnings:

  - You are about to drop the `DataStream` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "KnowledgeType" AS ENUM ('SITE', 'TEXT');

-- DropForeignKey
ALTER TABLE "DataStream" DROP CONSTRAINT "DataStream_chatbotId_fkey";

-- DropTable
DROP TABLE "DataStream";

-- DropEnum
DROP TYPE "DataStreamType";

-- CreateTable
CREATE TABLE "KnowledgeSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "knowledgeBaseId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "type" "KnowledgeType" NOT NULL,
    "indexIds" TEXT[],

    CONSTRAINT "KnowledgeSource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KnowledgeSource" ADD CONSTRAINT "KnowledgeSource_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "KnowledgeBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
