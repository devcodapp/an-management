-- CreateTable
CREATE TABLE "Additional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdUser" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedUser" TEXT,
    "deletedAt" DATETIME,
    CONSTRAINT "Additional_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryAdditional" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
