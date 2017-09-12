const client = require('../pg')
const bcrypt = require('bcrypt')

const insertDaterText = `INSERT INTO daters(email, password, face_image, body_image, description) VALUES ($1, $2, $3, $4, $5)`;

const insertDater = function(text, values) {
  let dbPassword = values[1];
  return bcrypt.hash(dbPassword, 5)
  .then(hash => {
    values[1] = hash;
    return client.query(text, values)
    .then(result => console.log('Successfully added dater to daters table'))
    .catch(error => {
      console.log('Could not insert into daters')
      console.log(error)
    })
  })
  .catch(error => {
    console.log('Could not hash password')
    console.log(error)
  })
}

module.exports = {
  insertDater,
  insertDaterText
}
