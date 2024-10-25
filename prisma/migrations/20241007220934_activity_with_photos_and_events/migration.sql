/*
  Warnings:

  - You are about to drop the column `allDay` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `onCalendar` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `PhotoLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cityId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "PhotoLink" DROP CONSTRAINT "PhotoLink_cityId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "allDay",
DROP COLUMN "destinationId",
DROP COLUMN "end",
DROP COLUMN "notes",
DROP COLUMN "onCalendar",
DROP COLUMN "rank",
DROP COLUMN "start",
ADD COLUMN     "cityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PhotoLink";

-- CreateTable
CREATE TABLE "ActivityPhotoLink" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "ActivityPhotoLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityPhotoLink" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "CityPhotoLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "notes" TEXT,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "onCalendar" BOOLEAN NOT NULL DEFAULT true,
    "rank" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "activityId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityPhotoLink" ADD CONSTRAINT "ActivityPhotoLink_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityPhotoLink" ADD CONSTRAINT "CityPhotoLink_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
