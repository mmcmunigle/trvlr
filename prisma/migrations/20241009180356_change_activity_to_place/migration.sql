/*
  Warnings:

  - You are about to drop the column `activityId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Lodging` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActivityPhotoLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Lodging` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('ACTIVITY', 'FOOD', 'LODGING', 'TRAVEL');

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_cityId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityPhotoLink" DROP CONSTRAINT "ActivityPhotoLink_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_activityId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "activityId",
ADD COLUMN     "placeId" INTEGER;

-- AlterTable
ALTER TABLE "Lodging" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "ActivityPhotoLink";

-- DropEnum
DROP TYPE "ActivityType";

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "link" VARCHAR(1023),
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "googlePlaceId" VARCHAR(511),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacePhotoLink" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "PlacePhotoLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacePhotoLink" ADD CONSTRAINT "PlacePhotoLink_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
