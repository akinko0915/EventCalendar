/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Event_categoryId_key` ON `Event`(`categoryId`);
