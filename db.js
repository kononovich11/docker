const db = require('@paralect/node-mongo').connect("mongodb://localhost:27017/docker");


module.exports = db;