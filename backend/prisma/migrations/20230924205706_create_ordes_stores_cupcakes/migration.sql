-- AlterTable
ALTER TABLE "ClientAddress" ALTER COLUMN "complement" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" VARCHAR(128) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupcake" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "ingredients" VARCHAR(256) NOT NULL,
    "value" MONEY NOT NULL,

    CONSTRAINT "Cupcake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "address" VARCHAR(128) NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" VARCHAR(128),
    "neighborhood" VARCHAR(128) NOT NULL,
    "city" VARCHAR(128) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zipcode" CHAR(8) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreDeliveryRange" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "initial" INTEGER NOT NULL,
    "final" INTEGER NOT NULL,

    CONSTRAINT "StoreDeliveryRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "cupcakes" JSONB NOT NULL,
    "value" MONEY NOT NULL,
    "paymentMethod" VARCHAR(128) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CupcakeCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cupcake_name_key" ON "Cupcake"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CupcakeCategory_AB_unique" ON "_CupcakeCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CupcakeCategory_B_index" ON "_CupcakeCategory"("B");

-- AddForeignKey
ALTER TABLE "StoreDeliveryRange" ADD CONSTRAINT "StoreDeliveryRange_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "ClientAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupcakeCategory" ADD CONSTRAINT "_CupcakeCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupcakeCategory" ADD CONSTRAINT "_CupcakeCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Cupcake"("id") ON DELETE CASCADE ON UPDATE CASCADE;
