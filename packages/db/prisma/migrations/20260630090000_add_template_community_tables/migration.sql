-- CreateTable
CREATE TABLE IF NOT EXISTS "template_reviews" (
    "id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "text" TEXT,
    "templateId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "user_owned_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "clonedFormId" TEXT,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_owned_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "template_reviews_templateId_userId_key" ON "template_reviews"("templateId", "userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "template_reviews_templateId_idx" ON "template_reviews"("templateId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "template_reviews_userId_idx" ON "template_reviews"("userId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "user_owned_templates_userId_templateId_key" ON "user_owned_templates"("userId", "templateId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "user_owned_templates_userId_idx" ON "user_owned_templates"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "user_owned_templates_templateId_idx" ON "user_owned_templates"("templateId");

-- AddForeignKey
ALTER TABLE "template_reviews" DROP CONSTRAINT IF EXISTS "template_reviews_templateId_fkey";
ALTER TABLE "template_reviews" ADD CONSTRAINT "template_reviews_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template_reviews" DROP CONSTRAINT IF EXISTS "template_reviews_userId_fkey";
ALTER TABLE "template_reviews" ADD CONSTRAINT "template_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_owned_templates" DROP CONSTRAINT IF EXISTS "user_owned_templates_userId_fkey";
ALTER TABLE "user_owned_templates" ADD CONSTRAINT "user_owned_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_owned_templates" DROP CONSTRAINT IF EXISTS "user_owned_templates_templateId_fkey";
ALTER TABLE "user_owned_templates" ADD CONSTRAINT "user_owned_templates_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
