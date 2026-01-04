-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "price" REAL,
    "priceType" TEXT NOT NULL DEFAULT 'ONE_TIME',
    "startsFrom" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "discount" REAL,
    "originalPrice" REAL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Package" ("createdAt", "description", "discount", "displayOrder", "features", "id", "imageUrl", "isActive", "isFeatured", "name", "originalPrice", "price", "priceType", "shortDescription", "slug", "updatedAt") SELECT "createdAt", "description", "discount", "displayOrder", "features", "id", "imageUrl", "isActive", "isFeatured", "name", "originalPrice", "price", "priceType", "shortDescription", "slug", "updatedAt" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
