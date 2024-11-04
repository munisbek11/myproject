const express = require("express");
const cors = require("cors");
const {v4} = require("uuid");
const error_midw = require("./middleware/error_midw");
const marketRouter = require("./router/market_router");
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cors())

app.use(marketRouter)

app.use(error_midw)

app.listen(PORT, ()=>{
  console.log(`Server is running on the port: ${PORT}`);
})