/*
  Warnings:

  - The values [DEVELOPMENT,DESIGN,PLANNING,MANAGEMENT] on the enum `SkillType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SkillType_new" AS ENUM ('TECHNOLOGIES', 'FRONTEND', 'STYLING', 'BACKEND', 'TESTING', 'DEVOPS', 'METHODOLOGIES', 'AI');
ALTER TABLE "SkillCategory" ALTER COLUMN "type" TYPE "SkillType_new" USING ("type"::text::"SkillType_new");
ALTER TYPE "SkillType" RENAME TO "SkillType_old";
ALTER TYPE "SkillType_new" RENAME TO "SkillType";
DROP TYPE "public"."SkillType_old";
COMMIT;
