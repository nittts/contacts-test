import { DatabaseService } from "./database.service"
import fs from "fs"
import path from "path"

const dbService = new DatabaseService()

export async function runMigrations() {
  const connection = await dbService.getConnection()

  const migrationsPath = path.join(__dirname, "migrations")
  const migrationFiles = fs.readdirSync(migrationsPath).filter((f) => f.endsWith(".sql"))

  for (const file of migrationFiles) {
    const sql = fs.readFileSync(path.join(migrationsPath, file), "utf-8")
    console.log(`Running migration: ${file}`)
    await connection.query(sql)
  }

  console.log("All migrations executed.")
  connection.release()
}
