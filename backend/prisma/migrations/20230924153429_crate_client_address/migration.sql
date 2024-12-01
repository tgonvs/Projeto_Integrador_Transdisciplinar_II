-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "favoriteAddressId" INTEGER;

-- CreateTable
CREATE TABLE "ClientAddress" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "address" VARCHAR(128) NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" VARCHAR(128) NOT NULL,
    "neighborhood" VARCHAR(128) NOT NULL,
    "city" VARCHAR(128) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zipcode" CHAR(8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
