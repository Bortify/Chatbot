-- AlterTable
ALTER TABLE "Chatbot" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;
