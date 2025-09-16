import dotenv from "dotenv"
dotenv.config()

import mysql, { QueryResult } from "mysql2/promise"

export class DatabaseService {
  private pool: mysql.Pool

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "test",
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const [rows] = await this.pool.query<QueryResult>(sql, params)

    return rows
  }

  async getConnection() {
    return this.pool.getConnection()
  }
}
