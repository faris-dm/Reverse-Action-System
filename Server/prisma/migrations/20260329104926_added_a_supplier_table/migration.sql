-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPPLIER', 'BUYER');

-- CreateTable
CREATE TABLE "suppliers" (
    "id" UUID NOT NULL,
    "business_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "addressm" TEXT,
    "tax_id" VARCHAR(100),
    "registration_number" VARCHAR(100),
    "years_in_business" INTEGER,
    "categories" TEXT[],
    "bio" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "verified_at" TIMESTAMP,
    "rejected_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_tax_id_key" ON "suppliers"("tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_registration_number_key" ON "suppliers"("registration_number");

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
