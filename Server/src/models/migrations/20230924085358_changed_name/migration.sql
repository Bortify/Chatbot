/*
  Warnings:

  - You are about to drop the column `isEmailVerfiy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isEmailVerfiy",
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;
