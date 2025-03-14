/*
  Warnings:

  - Added the required column `value` to the `Scrap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scrap" ADD COLUMN     "value" TEXT NOT NULL;
