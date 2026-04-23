-- AlterTable
ALTER TABLE "Post"
ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Travel Tips',
ADD COLUMN     "readTimeMinutes" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- Backfill publish timestamps for any existing published posts
UPDATE "Post"
SET "publishedAt" = "createdAt"
WHERE "published" = true
  AND "publishedAt" IS NULL;

-- CreateIndex
CREATE INDEX "Post_published_createdAt_idx" ON "Post"("published", "createdAt");

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "Post"("category");

-- CreateIndex
CREATE INDEX "Post_featured_idx" ON "Post"("featured");