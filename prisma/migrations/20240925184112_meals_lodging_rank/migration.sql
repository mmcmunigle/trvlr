/*
  Warnings:

  - The values [FOOD] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('TAPAS', 'PUB', 'SEAFOOD', 'PASTA', 'BAR', 'COFFEE_SHOP', 'OTHER');

-- CreateEnum
CREATE TYPE "LODGING_TYPE" AS ENUM ('AIRBNB', 'BOTIQUE', 'HOTEL', 'ALL_INCLUSIVE', 'HOSTEL');

-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('TRAVEL', 'ACTIVITY', 'TOUR', 'HISTORICAL');
ALTER TABLE "Activity" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Activity" ALTER COLUMN "type" TYPE "ActivityType_new" USING ("type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
ALTER TABLE "Activity" ALTER COLUMN "type" SET DEFAULT 'ACTIVITY';
COMMIT;

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "rank" DECIMAL(65,30) NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "link" VARCHAR(1023),
    "notes" TEXT,
    "type" "MealType" NOT NULL DEFAULT 'OTHER',
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "onCalendar" BOOLEAN NOT NULL DEFAULT true,
    "rank" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destinationId" INTEGER,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lodging" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "link" VARCHAR(1023),
    "notes" TEXT,
    "type" "LODGING_TYPE" NOT NULL DEFAULT 'HOTEL',
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "days" INTEGER NOT NULL,
    "onCalendar" BOOLEAN NOT NULL DEFAULT true,
    "rank" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destinationId" INTEGER,

    CONSTRAINT "Lodging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lodging" ADD CONSTRAINT "Lodging_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;
