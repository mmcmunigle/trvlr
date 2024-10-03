/*
  Warnings:

  - Added the required column `sourceId` to the `PhotoLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoLink" ADD COLUMN     "sourceId" TEXT NOT NULL;
