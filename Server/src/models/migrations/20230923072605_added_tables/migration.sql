/*
  Warnings:

  - You are about to drop the column `activeLinks` on the `DataStream` table. All the data in the column will be lost.
  - You are about to drop the column `hostURL` on the `DataStream` table. All the data in the column will be lost.
  - Added the required column `data` to the `DataStream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataStream" DROP COLUMN "activeLinks",
DROP COLUMN "hostURL",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "indexIds" TEXT[];
