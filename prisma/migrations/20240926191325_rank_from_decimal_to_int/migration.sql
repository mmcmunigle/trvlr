/*
  Warnings:

  - You are about to alter the column `rank` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `rank` on the `Lodging` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `rank` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "rank" SET DEFAULT 1,
ALTER COLUMN "rank" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Lodging" ALTER COLUMN "rank" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "rank" SET DATA TYPE INTEGER;
