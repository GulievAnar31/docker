const express = require('express')
const app = express()
const port = 3456

app.get('/version', (req, res) => {
  res.send(process.versions.node);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// docker run -it 212e3aa499f8 sh
// docker run -p 7654:3456 212e3aa499f8