# Migration `20201005184244`

This migration has been generated at 10/5/2020, 1:42:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)

CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201005184244
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,27 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Candidate {
+  id        String   @id @default(uuid())
+  name      String
+  votes     Vote[]
+  updatedAt DateTime @updatedAt
+  createdAt DateTime @default(now())
+}
+
+model Vote {
+  id          String    @id @default(uuid())
+  candidateId String
+  candidate   Candidate @relation(fields: [candidateId], references: [id])
+  updatedAt   DateTime  @updatedAt
+  createdAt   DateTime  @default(now())
+}
```


