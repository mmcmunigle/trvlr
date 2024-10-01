-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255),
    "description" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoLink" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "PhotoLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotoLink" ADD CONSTRAINT "PhotoLink_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
