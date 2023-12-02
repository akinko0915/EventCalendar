/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Event` table. All the data in the column will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` MODIFY `eventId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `dateTime`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `endAt` DATETIME(3) NULL,
    ADD COLUMN `published` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `startAt` DATETIME(3) NULL,
    MODIFY `maximumParticipant` INTEGER NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL;
