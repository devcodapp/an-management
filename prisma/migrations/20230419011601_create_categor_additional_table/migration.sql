-- CreateTable
CREATE TABLE "CategoryAdditional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdUser" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedUser" TEXT,
    "deletedAt" DATETIME
);
