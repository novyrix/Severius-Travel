/*
  Warnings:

  - You are about to drop the column `tourId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TourDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TourImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tourSlug` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourTitle` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_tourId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Country" DROP CONSTRAINT "Country_regionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tour" DROP CONSTRAINT "Tour_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TourDay" DROP CONSTRAINT "TourDay_tourId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TourImage" DROP CONSTRAINT "TourImage_tourId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "tourId",
ADD COLUMN     "guests" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "tourSlug" TEXT NOT NULL,
ADD COLUMN     "tourTitle" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Country";

-- DropTable
DROP TABLE "public"."Region";

-- DropTable
DROP TABLE "public"."Tour";

-- DropTable
DROP TABLE "public"."TourDay";

-- DropTable
DROP TABLE "public"."TourImage";
