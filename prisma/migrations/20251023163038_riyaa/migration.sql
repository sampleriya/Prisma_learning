/*
  Warnings:

  - You are about to drop the column `name` on the `NotificationMethods` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `NotificationMethods` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `NotificationMethods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `NotificationMethods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationMethods" DROP COLUMN "name",
ADD COLUMN     "phone" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlogToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BlogToCategory_B_index" ON "_BlogToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationMethods_userId_key" ON "NotificationMethods"("userId");

-- AddForeignKey
ALTER TABLE "NotificationMethods" ADD CONSTRAINT "NotificationMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToCategory" ADD CONSTRAINT "_BlogToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToCategory" ADD CONSTRAINT "_BlogToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
