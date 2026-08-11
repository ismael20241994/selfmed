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
  });


export default pool;