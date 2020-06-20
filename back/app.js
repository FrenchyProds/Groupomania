var express = require("express")
// var cors = require ("cors")
var bodyParser = require("body-parser")
var app = express()
// var helmet = require("helmet")

const userRoutes = require('./routes/user');
const redditRoutes = require('./routes/reddit')

// app.use(helmet())

app.use((req, res, next) => {  // We declare all the headers to allow :
    res.setHeader('Access-Control-Allow-Origin', '*'); // Connection from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Access to any of these routes
    next();
  });

app.use(bodyParser.json())
// app.use(cors())
app.use(
    bodyParser.urlencoded({ extended : false })
)

app.use('/', userRoutes);
app.use('/', redditRoutes);

module.exports = app;