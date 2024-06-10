import dotenv from 'dotenv'
import mssql from 'mssql'

dotenv.config()
console.log("processes env")
console.log("server.::. " + process.env.PR_SERVER);


export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.PR_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

async function testConnection() {
  let pool = await mssql.connect(sqlConfig)

  if (pool.connected) {
    console.log("Connection established ...");
  } else {
    console.log("Error establishing connection");
  }
}

testConnection()