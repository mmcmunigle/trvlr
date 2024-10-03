/*
  Warnings:

  - Added the required column `link` to the `PhotoLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhotoLink" ADD COLUMN     "link" TEXT NOT NULL;
