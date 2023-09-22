/*
  Warnings:

  - You are about to drop the column `indexName` on the `Chatbot` table. All the data in the column will be lost.
  - The `id` column on the `VectorStore` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[indexId]` on the table `VectorStore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatbotId` to the `VectorStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indexId` to the `VectorStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VectorStore_id_key";

-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "indexName";

-- AlterTable
ALTER TABLE "VectorStore" ADD COLUMN     "chatbotId" INTEGER NOT NULL,
ADD COLUMN     "indexId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "VectorStore_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "VectorStore_indexId_key" ON "VectorStore"("indexId");

-- AddForeignKey
ALTER TABLE "VectorStore" ADD CONSTRAINT "VectorStore_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
