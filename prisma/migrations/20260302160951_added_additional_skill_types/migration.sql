/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `SkillCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[type,name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_categoryId_fkey";

-- DropIndex
DROP INDEX "Skill_categoryId_name_key";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "categoryId",
ADD COLUMN     "type" "SkillType" NOT NULL;

-- DropTable
DROP TABLE "SkillCategory";

-- CreateIndex
CREATE UNIQUE INDEX "Skill_type_name_key" ON "Skill"("type", "name");
