/*
  Warnings:

  - You are about to drop the `Horarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Horarios";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "horarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia_da_semana" INTEGER NOT NULL,
    "inicio_em_minutos" INTEGER NOT NULL,
    "fim_em_minutos" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "horarios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observation" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "agendamentos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
