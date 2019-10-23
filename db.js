var low = require('lowdb'); //from document on website
var FileSync = require('lowdb/adapters/FileSync'); //from document on website
var adapter = new FileSync('db.json'); //from document on website

db = low(adapter);

db.defaults({ users: [] }) //from document on website
  .write()

module.exports = db;