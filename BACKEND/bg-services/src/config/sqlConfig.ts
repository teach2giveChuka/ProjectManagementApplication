import dotenv from 'dotenv'

dotenv.config()

export const sqlConfig={
  user: 'cee',
  password: '2180',
  database: 'Users',
  server: "CEE/SQLEXPRESS",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}