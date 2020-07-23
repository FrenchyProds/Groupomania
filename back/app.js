require ('dotenv').config();
const express = require("express")
const cors = require ("cors")
const bodyParser = require("body-parser")

const helmet = require("helmet")

const userRoutes = require('./routes/user');
const postRoutes = require('./controllers/Posts')

const app = express()

app.use(helmet())

app.use((req, res, next) => {  // We declare all the headers to allow :
    res.setHeader('Access-Control-Allow-Origin', '*'); // Connection from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Access to any of these routes
    next();
  });

app.use(cors())
app.use(
    bodyParser.urlencoded({ extended : false })
)

app.use(bodyParser.json())

app.use('/', userRoutes);
app.use('/', postRoutes);

module.exports = app;