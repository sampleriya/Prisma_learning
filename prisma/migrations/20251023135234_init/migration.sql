-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blog" BYTEA,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notificationMethods" JSONB,
ADD COLUMN     "role" "UserRole",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
