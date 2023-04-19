/*
  Warnings:

  - Added the required column `name` to the `CategoryAdditional` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryAdditional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdUser" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedUser" TEXT,
    "deletedAt" DATETIME
);
INSERT INTO "new_CategoryAdditional" ("companyId", "createdAt", "createdUser", "deletedAt", "deletedUser", "id", "order") SELECT "companyId", "createdAt", "createdUser", "deletedAt", "deletedUser", "id", "order" FROM "CategoryAdditional";
DROP TABLE "CategoryAdditional";
ALTER TABLE "new_CategoryAdditional" RENAME TO "CategoryAdditional";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
