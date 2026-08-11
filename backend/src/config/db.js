import mysql from "mysql2/promise";

const pool = await mysql.createPool({
  /*host: "localhost",
  user: "root",
  password: "Klev@x952",
  database: "usuario"*/
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.getConnection()
  .then(connection => {
    console.log('✅ MYSQL CONECTADO');
  
    connection.release();
  })
  .catch(error => {
    console.log('❌ ERRO MYSQL:', error.message);
      console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD_EXISTS: !!process.env.DB_PASSWORD
  });
  });


export default pool;