/*
  Warnings:

  - You are about to alter the column `latitude` on the `Lodging` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `longitude` on the `Lodging` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Made the column `tripId` on table `Destination` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Destination" DROP CONSTRAINT "Destination_tripId_fkey";

-- AlterTable
ALTER TABLE "Destination" ALTER COLUMN "days" DROP NOT NULL,
ALTER COLUMN "stopNumber" DROP NOT NULL,
ALTER COLUMN "tripId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lodging" ALTER COLUMN "latitude" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "longitude" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
