import mysql from "mysql2/promise";

const pool = await mysql.createPool({
  /* host: "localhost",
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

/*import mysql from "mysql2/promise";

console.log("🔧 CONFIG MYSQL:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? "******" : "NÃO DEFINIDA",
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,

  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,

  connectTimeout: 20000,
});

async function testMySQL() {
  let connection;

  try {
    console.log("🔄 Conectando ao MySQL...");

    connection = await pool.getConnection();

    console.log("✅ MYSQL CONECTADO");

    const [rows] = await connection.query(
      "SELECT NOW() AS server_time, VERSION() AS version"
    );

    console.log("✅ MYSQL RESPONDEU:", rows);

  } catch (error) {
    console.error("❌ ERRO MYSQL COMPLETO:");
    console.error(error);

  } finally {
    if (connection) {
      connection.release();
    }
  }
}

testMySQL();

export default pool;*/
