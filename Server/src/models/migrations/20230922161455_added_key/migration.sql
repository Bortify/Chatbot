/*
  Warnings:

  - The required column `key` was added to the `Chatbot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "key" TEXT NOT NULL;
