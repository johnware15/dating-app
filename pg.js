const { Client } = require('pg');
const client = new Client({
  user: 'johnware',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'dating_app_test' : 'dating_app',
  port: 5432
})
client.connect()

module.exports = client
