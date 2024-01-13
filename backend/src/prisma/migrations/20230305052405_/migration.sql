/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TTL` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `expires` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    DROP COLUMN `TTL`,
    DROP COLUMN `sessionId`,
    ADD COLUMN `data` MEDIUMTEXT NULL,
    ADD COLUMN `expires` INTEGER NOT NULL,
    ADD COLUMN `session_id` VARCHAR(200) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`session_id`);
