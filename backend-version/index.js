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

  const result = await client.query("");
  
  // res.send(process.versions.node);
  res.send(result.rows);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// docker run -it 212e3aa499f8 sh
// docker run -p 7654:3456 212e3aa499f8