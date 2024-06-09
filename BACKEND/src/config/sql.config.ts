import dotenv from 'dotenv'
import mssql from 'mssql'

dotenv.config()
console.log(process.env.PR_SERVER);

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

async function testConnection(){
       let pool = await mssql.connect(sqlConfig)
  
       if(pool.connected){
           console.log("Connection established ...");
          //   let query = 'CREATE DATABASE PROJECT_MANAGEMENT';
  
          //   // id, username, email, password, role
          //  let usersTable = 'CREATE TABLE Users(id VARCHAR(255), name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT user)'
  
          //  let result = (await pool.request().query(usersTable)).output
  
          //  console.log(result);
          
       }else{
           console.log("Error establishing connection");
       }
   }
  
   testConnection()