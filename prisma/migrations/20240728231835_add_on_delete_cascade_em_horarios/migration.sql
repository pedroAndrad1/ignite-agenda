-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Horarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia_da_semana" INTEGER NOT NULL,
    "inicio_em_minutos" INTEGER NOT NULL,
    "fim_em_minutos" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Horarios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Horarios" ("dia_da_semana", "fim_em_minutos", "id", "inicio_em_minutos", "user_id") SELECT "dia_da_semana", "fim_em_minutos", "id", "inicio_em_minutos", "user_id" FROM "Horarios";
DROP TABLE "Horarios";
ALTER TABLE "new_Horarios" RENAME TO "Horarios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
