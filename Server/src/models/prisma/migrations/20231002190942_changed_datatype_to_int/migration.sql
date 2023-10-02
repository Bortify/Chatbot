/*
  Warnings:

  - You are about to alter the column `tokens` on the `Chatbot` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Chatbot" ALTER COLUMN "tokens" SET DATA TYPE INTEGER;
