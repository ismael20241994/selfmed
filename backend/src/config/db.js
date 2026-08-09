import mysql from "mysql2/promise";

const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Klev@x952",
  database: "usuario"
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