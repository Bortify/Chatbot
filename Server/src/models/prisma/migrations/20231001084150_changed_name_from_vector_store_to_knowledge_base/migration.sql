/*
  Warnings:

  - You are about to drop the `VectorStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VectorStore" DROP CONSTRAINT "VectorStore_chatbotId_fkey";

-- DropTable
DROP TABLE "VectorStore";

-- CreateTable
CREATE TABLE "KnowledgeBase" (
    "id" SERIAL NOT NULL,
    "indexName" TEXT NOT NULL,
    "chatbotId" INTEGER NOT NULL,

    CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeBase_chatbotId_key" ON "KnowledgeBase"("chatbotId");

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
