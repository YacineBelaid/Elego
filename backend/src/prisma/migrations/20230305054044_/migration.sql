/*
  Warnings:

  - The primary key for the `Waypoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `long` on the `Waypoint` table. All the data in the column will be lost.
  - Added the required column `longi` to the `Waypoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Waypoint` DROP PRIMARY KEY,
    DROP COLUMN `long`,
    ADD COLUMN `longi` FLOAT NOT NULL,
    ADD PRIMARY KEY (`longi`, `lat`);
