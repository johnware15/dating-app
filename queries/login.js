const client = require('./pg')
const bcrypt = require('bcrypt')

const selectDaterText = `SELECT email, password FROM daters WHERE email=$1`;
const selectDaterEmailText = `SELECT email FROM daters WHERE email=$1`;

const selectDater = function(text, values, password) {
  let dbPassword
  return client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].passoword
    return bcrypt.compare(password, dbPassword)
    .then(result => result)
  })
  .catch(error => {
    console.log('Did not find dater')
    console.log(error)
  })
}

const selectDaterEmail = function(text, values) {
  return client.query(text, values)
  .then(result => result.rows[0].email)
  .catch(error => {
    console.log(error)
    return undefined
  })
}

module.exports = {
  selectDater,
  selectDaterEmail,
  selectDaterEmailText,
  selectDaterText
}
