const { Client } = require('pg');
const client = new Client({
  user: 'johnware',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'dating_app_test' : 'dating_app',
  port: 3000
})
client.connect()

module.exports = client
