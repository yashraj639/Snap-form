-- AlterTable
ALTER TABLE "user_owned_templates" DROP CONSTRAINT IF EXISTS "user_owned_templates_clonedFormId_fkey";
ALTER TABLE "user_owned_templates" ADD CONSTRAINT "user_owned_templates_clonedFormId_fkey" FOREIGN KEY ("clonedFormId") REFERENCES "forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
