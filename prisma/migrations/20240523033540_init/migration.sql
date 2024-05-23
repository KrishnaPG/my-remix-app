-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "atrim";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "stripe";

-- CreateEnum
CREATE TYPE "atrim"."Currency" AS ENUM ('AUD', 'EUR', 'INR', 'SGD', 'USD');

-- CreateTable
CREATE TABLE "stripe"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."UserImage" (
    "id" TEXT NOT NULL,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BYTEA NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."Permission" (
    "id" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."PlanLimit" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "maxItems" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlanLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."Price" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe"."Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currentPeriodStart" INTEGER NOT NULL,
    "currentPeriodEnd" INTEGER NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."Org" (
    "id" TEXT NOT NULL,
    "lei" TEXT NOT NULL,
    "leiData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."LC" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "atrim"."Currency" NOT NULL DEFAULT 'USD',
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issuedTo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."Invoice" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issuedTo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."InvoiceItem" (
    "id" SERIAL NOT NULL,
    "goodsId" TEXT NOT NULL,
    "goodsDesc" TEXT NOT NULL,
    "hsCode" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "unitPriceCurrency" "atrim"."Currency" NOT NULL,
    "unitPriceUOM" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "weightUOM" TEXT NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "volumeUOM" TEXT NOT NULL,
    "tenor" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."BL" (
    "id" TEXT NOT NULL,
    "portOfLoading" TEXT NOT NULL,
    "portOfDischarge" TEXT NOT NULL,
    "transhipmentCountry" TEXT NOT NULL,
    "vesselId" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issuedTo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."Vessel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vessel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."LCPaymentApplication" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "beneficieryId" TEXT NOT NULL,
    "lcId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LCPaymentApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atrim"."LCPaymentAppBLItem" (
    "id" SERIAL NOT NULL,
    "applicationId" TEXT NOT NULL,
    "blId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "stripe"."_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "stripe"."_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "stripe"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "stripe"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "stripe"."User"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "stripe"."UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "stripe"."Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_entity_access_key" ON "stripe"."Permission"("action", "entity", "access");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_id_key" ON "stripe"."Plan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlanLimit_planId_key" ON "stripe"."PlanLimit"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_id_key" ON "stripe"."Price"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "stripe"."Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "stripe"."Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Org_lei_key" ON "atrim"."Org"("lei");

-- CreateIndex
CREATE INDEX "Org_lei_idx" ON "atrim"."Org"("lei");

-- CreateIndex
CREATE INDEX "LC_issuedBy_issuedTo_idx" ON "atrim"."LC"("issuedBy", "issuedTo");

-- CreateIndex
CREATE INDEX "LC_createdAt_idx" ON "atrim"."LC"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_key" ON "atrim"."Invoice"("id");

-- CreateIndex
CREATE INDEX "Invoice_issuedBy_issuedTo_idx" ON "atrim"."Invoice"("issuedBy", "issuedTo");

-- CreateIndex
CREATE INDEX "Invoice_date_idx" ON "atrim"."Invoice"("date");

-- CreateIndex
CREATE INDEX "InvoiceItem_invoiceId_idx" ON "atrim"."InvoiceItem"("invoiceId");

-- CreateIndex
CREATE INDEX "BL_issuedBy_issuedTo_idx" ON "atrim"."BL"("issuedBy", "issuedTo");

-- CreateIndex
CREATE INDEX "BL_portOfLoading_idx" ON "atrim"."BL"("portOfLoading");

-- CreateIndex
CREATE INDEX "BL_portOfDischarge_idx" ON "atrim"."BL"("portOfDischarge");

-- CreateIndex
CREATE INDEX "BL_vesselId_idx" ON "atrim"."BL"("vesselId");

-- CreateIndex
CREATE INDEX "BL_createdAt_idx" ON "atrim"."BL"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Vessel_name_key" ON "atrim"."Vessel"("name");

-- CreateIndex
CREATE INDEX "Vessel_name_idx" ON "atrim"."Vessel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LCPaymentApplication_invoiceId_key" ON "atrim"."LCPaymentApplication"("invoiceId");

-- CreateIndex
CREATE INDEX "LCPaymentApplication_invoiceId_idx" ON "atrim"."LCPaymentApplication"("invoiceId");

-- CreateIndex
CREATE INDEX "LCPaymentApplication_applicantId_beneficieryId_idx" ON "atrim"."LCPaymentApplication"("applicantId", "beneficieryId");

-- CreateIndex
CREATE INDEX "LCPaymentApplication_lcId_idx" ON "atrim"."LCPaymentApplication"("lcId");

-- CreateIndex
CREATE INDEX "LCPaymentApplication_createdAt_idx" ON "atrim"."LCPaymentApplication"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LCPaymentAppBLItem_blId_key" ON "atrim"."LCPaymentAppBLItem"("blId");

-- CreateIndex
CREATE INDEX "LCPaymentAppBLItem_applicationId_blId_createdAt_idx" ON "atrim"."LCPaymentAppBLItem"("applicationId", "blId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "stripe"."_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "stripe"."_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "stripe"."_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "stripe"."_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "stripe"."UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "stripe"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."PlanLimit" ADD CONSTRAINT "PlanLimit_planId_fkey" FOREIGN KEY ("planId") REFERENCES "stripe"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."Price" ADD CONSTRAINT "Price_planId_fkey" FOREIGN KEY ("planId") REFERENCES "stripe"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "stripe"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "stripe"."Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."Subscription" ADD CONSTRAINT "Subscription_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "stripe"."Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LC" ADD CONSTRAINT "LC_issuedBy_fkey" FOREIGN KEY ("issuedBy") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LC" ADD CONSTRAINT "LC_issuedTo_fkey" FOREIGN KEY ("issuedTo") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."Invoice" ADD CONSTRAINT "Invoice_issuedBy_fkey" FOREIGN KEY ("issuedBy") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."Invoice" ADD CONSTRAINT "Invoice_issuedTo_fkey" FOREIGN KEY ("issuedTo") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "atrim"."Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."BL" ADD CONSTRAINT "BL_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "atrim"."Vessel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."BL" ADD CONSTRAINT "BL_issuedBy_fkey" FOREIGN KEY ("issuedBy") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."BL" ADD CONSTRAINT "BL_issuedTo_fkey" FOREIGN KEY ("issuedTo") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LCPaymentApplication" ADD CONSTRAINT "LCPaymentApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LCPaymentApplication" ADD CONSTRAINT "LCPaymentApplication_beneficieryId_fkey" FOREIGN KEY ("beneficieryId") REFERENCES "atrim"."Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LCPaymentApplication" ADD CONSTRAINT "LCPaymentApplication_lcId_fkey" FOREIGN KEY ("lcId") REFERENCES "atrim"."LC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LCPaymentApplication" ADD CONSTRAINT "LCPaymentApplication_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "atrim"."Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LCPaymentAppBLItem" ADD CONSTRAINT "LCPaymentAppBLItem_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "atrim"."LCPaymentApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atrim"."LCPaymentAppBLItem" ADD CONSTRAINT "LCPaymentAppBLItem_blId_fkey" FOREIGN KEY ("blId") REFERENCES "atrim"."BL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "stripe"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "stripe"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "stripe"."Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe"."_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "stripe"."Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
