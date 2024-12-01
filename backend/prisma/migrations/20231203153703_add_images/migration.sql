/*
  Warnings:

  - Added the required column `image` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Cupcake` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" VARCHAR(256) NOT NULL;

-- AlterTable
ALTER TABLE "Cupcake" ADD COLUMN     "image" VARCHAR(256) NOT NULL;
