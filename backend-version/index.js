const express = require('express')
const { Pool } = require('pg');

const app = express()
const port = 3456

const client = new Pool({
  user: "anar",
  host: "db",
  database: "lang_db",
  port: "5432",
  password: "qwerty123"
});

app.get('/version', async (req, res) => {
  console.log('=== /version endpoint called ===');
  try {
    console.log('Executing database query...');
    // Выполняем простой запрос для проверки подключения к БД
    const result = await client.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log('Database query result:', result.rows);
    
    const response = {
      node_version: process.versions.node,
      database_info: result.rows[0],
      status: 'ok'
    };
    console.log('Sending response:', response);
    
    res.json(response);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      node_version: process.versions.node,
      database_error: error.message,
      status: 'error'
    });
  }
})

// app.get('/health', (req, res) => {
//   console.log(`health +++++++++++++++++++++++++`)
//   res.status(200).send({qwe: "hello"});
// });

setTimeout(() => {
  console.log("setTimeout 💣")
  app.get('/health', (req, res) => {
    console.log(`health +++++++++++++++++++++++++`)
    res.status(200).send({qwe: "hello"});
  });
}, 20_000);

app.listen(port, () => {
  console.log(`🦊 Example app listening on port ${port}`)
})

// as shut down at 2025-10-26 15:24:13 UTC
// db-1               | 2025-10-26 15:24:31.397 UTC [1] LOG:  database system is ready to accept connections
// backend-version-1  | 🦊 Example app listening on port 3456
// backend-version-1  | setTimeout 💣
// backend-version-1  | health +++++++++++++++++++++++++
// backend-main-1     | Example app listening on port 3456
// backend-version-1  | health +++++++++++++++++++++++++
// backend-version-1  | health +++++++++++++++++++++++++
// backend-version-1  | health +++++++++++++++++++++++++
// backend-version-1  | health +++++++++++++++++++++++++
// backend-version-1  | health +++++++++++++++++++++++++
// backend-version-1  | health +++++++++++++++++++++++++

// docker run -it 212e3aa499f8 sh
// docker run -p 7654:3456 212e3aa499f8