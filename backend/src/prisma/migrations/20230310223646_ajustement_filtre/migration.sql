/*
  Warnings:

  - You are about to drop the column `compact` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `seats_2` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `seats_4` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `seats_5` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `seats_7` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `seats_n` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `Filtre` table. All the data in the column will be lost.
  - You are about to drop the column `suv` on the `Filtre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Filtre` DROP COLUMN `compact`,
    DROP COLUMN `seats_2`,
    DROP COLUMN `seats_4`,
    DROP COLUMN `seats_5`,
    DROP COLUMN `seats_7`,
    DROP COLUMN `seats_n`,
    DROP COLUMN `sport`,
    DROP COLUMN `suv`,
    ADD COLUMN `valid_categories` VARCHAR(200) NOT NULL DEFAULT '[]',
    ADD COLUMN `valid_seat_count` VARCHAR(200) NOT NULL DEFAULT '[]',
    ADD COLUMN `valid_types` VARCHAR(200) NOT NULL DEFAULT '[]';
