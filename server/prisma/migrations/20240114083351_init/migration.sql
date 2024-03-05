-- CreateEnum
CREATE TYPE "WeaponName" AS ENUM ('sword');

-- CreateEnum
CREATE TYPE "SkillName" AS ENUM ('felineAgility');

-- CreateEnum
CREATE TYPE "PetName" AS ENUM ('human');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kitten" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "hp" INTEGER NOT NULL DEFAULT 0,
    "enduranceStat" INTEGER NOT NULL DEFAULT 0,
    "enduranceModifier" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "enduranceValue" INTEGER NOT NULL DEFAULT 0,
    "strengthStat" INTEGER NOT NULL DEFAULT 0,
    "strengthModifier" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "strengthValue" INTEGER NOT NULL DEFAULT 0,
    "agilityStat" INTEGER NOT NULL DEFAULT 0,
    "agilityModifier" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "agilityValue" INTEGER NOT NULL DEFAULT 0,
    "speedStat" INTEGER NOT NULL DEFAULT 0,
    "speedModifier" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "speedValue" INTEGER NOT NULL DEFAULT 0,
    "userId" UUID,
    "weapons" "WeaponName"[] DEFAULT ARRAY[]::"WeaponName"[],
    "skills" "SkillName"[] DEFAULT ARRAY[]::"SkillName"[],
    "lastFight" DATE,
    "fightsLeft" INTEGER NOT NULL DEFAULT 6,
    "victories" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Kitten_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fight" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kitten1Id" INTEGER NOT NULL,
    "kitten2Id" INTEGER,
    "winner" VARCHAR(255) NOT NULL,
    "loser" VARCHAR(255) NOT NULL,
    "steps" TEXT NOT NULL,
    "fighters" TEXT NOT NULL,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Kitten" ADD CONSTRAINT "Kitten_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_kitten1Id_fkey" FOREIGN KEY ("kitten1Id") REFERENCES "Kitten"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_kitten2Id_fkey" FOREIGN KEY ("kitten2Id") REFERENCES "Kitten"("id") ON DELETE SET NULL ON UPDATE CASCADE;
