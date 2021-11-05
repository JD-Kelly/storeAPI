require('dotenv').config()



const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errortMiddleware = require('./middleware/error-handler');
const { get } = require("mongoose");

// middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})


app.use(notFoundMiddleware)
app.use(errortMiddleware)


const port = process.env.PORT || 3000
const start = async () => {
  try {
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start();