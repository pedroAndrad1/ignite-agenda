-- CreateTable
CREATE TABLE "Horarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia_da_semana" INTEGER NOT NULL,
    "inicio_em_minutos" INTEGER NOT NULL,
    "fim_em_minutos" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Horarios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
