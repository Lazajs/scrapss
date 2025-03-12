/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Scrap" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "xpath" TEXT NOT NULL,
    "endsOn" TIMESTAMP(3) NOT NULL,
    "notifyEvery" INTEGER NOT NULL,

    CONSTRAINT "Scrap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scrap_uri_key" ON "Scrap"("uri");
