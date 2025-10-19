const express = require('express')
const app = express()
const port = 3456

app.get('/main', async (req, res) => {
  const resp = await fetch("http://backend-version:3456/version");
  console.log("status", resp.status);
  res.send("==== " + await resp.text());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// docker run -it 212e3aa499f8 sh

// docker network create my-backend
// docker run -p 5566:3456 --name backend-main-container --network my-backend ...
// docker run --name backend-version --network my-backend ...

// curl localhost:5566/main
// curl localhost:7654/version

// backend-version:3456
//         ↑
// backend-main-container:3456 ← localhost:5566