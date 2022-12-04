/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Call` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[callId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[socialName]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telphone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "callId" TEXT,
ADD COLUMN     "storeId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Call_imageId_key" ON "Call"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_callId_key" ON "Image"("callId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_storeId_key" ON "Image"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_socialName_key" ON "Store"("socialName");

-- CreateIndex
CREATE UNIQUE INDEX "Store_cnpj_key" ON "Store"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Store_imageId_key" ON "Store"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "User_telphone_key" ON "User"("telphone");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
