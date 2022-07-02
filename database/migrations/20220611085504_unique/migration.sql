/*
  Warnings:

  - A unique constraint covering the columns `[userId,advertisementId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,advertisementId]` on the table `Starred` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_advertisementId_key" ON "Review"("userId", "advertisementId");

-- CreateIndex
CREATE UNIQUE INDEX "Starred_userId_advertisementId_key" ON "Starred"("userId", "advertisementId");
