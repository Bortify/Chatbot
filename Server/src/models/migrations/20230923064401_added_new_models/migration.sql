/*
  Warnings:

  - You are about to drop the column `indexId` on the `VectorStore` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `VectorStore` table. All the data in the column will be lost.
  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[indexName]` on the table `VectorStore` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chatbotId]` on the table `VectorStore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `indexName` to the `VectorStore` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DataStreamType" AS ENUM ('SITE', 'TEXT');

-- DropForeignKey
ALTER TABLE "VectorStore" DROP CONSTRAINT "VectorStore_chatbotId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_chatbotId_fkey";

-- DropIndex
DROP INDEX "VectorStore_indexId_key";

-- AlterTable
ALTER TABLE "VectorStore" DROP COLUMN "indexId",
DROP COLUMN "type",
ADD COLUMN     "indexName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Website";

-- DropEnum
DROP TYPE "VectorStoreType";

-- CreateTable
CREATE TABLE "DataStream" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hostURL" TEXT NOT NULL,
    "activeLinks" TEXT[],
    "chatbotId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "type" "DataStreamType" NOT NULL,

    CONSTRAINT "DataStream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataStream_chatbotId_key" ON "DataStream"("chatbotId");

-- CreateIndex
CREATE UNIQUE INDEX "VectorStore_indexName_key" ON "VectorStore"("indexName");

-- CreateIndex
CREATE UNIQUE INDEX "VectorStore_chatbotId_key" ON "VectorStore"("chatbotId");

-- AddForeignKey
ALTER TABLE "VectorStore" ADD CONSTRAINT "VectorStore_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataStream" ADD CONSTRAINT "DataStream_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
