-- CreateEnum
CREATE TYPE "VectorStoreType" AS ENUM ('SITE');

-- CreateTable
CREATE TABLE "VectorStore" (
    "id" TEXT NOT NULL,
    "type" "VectorStoreType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VectorStore_id_key" ON "VectorStore"("id");
