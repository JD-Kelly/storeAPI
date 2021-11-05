require('dotenv').config()
require('express-async-errors');


const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errortMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')


// middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)


app.use(notFoundMiddleware)
app.use(errortMiddleware)


const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start();