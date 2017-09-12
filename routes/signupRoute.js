const express = require('express')
const signupDaterRouter = express.Router()

const {
  insertDater,
  insertDaterText
} = require('../queries/signup.js')

const {
  selectDater,
  selectDaterEmail,
  selectDaterEmailText,
  selectDaterText
} = require('../queries/login.js')

signupDaterRouter.get('/signupdater/', (req, res) => {
  let errorObj = {
    error: false,
    message: '',
    activeUserError: false,
  }
  if (req.session.email) {
    res.redirect('/')
  }

  if (!req.query.error) {
    res.render('signupdater', errorObj)
  } else if (req.query.error === 'error1') {
    errorObj.error = true;
    errorObj.message = 'Please fill out all forms to continue';
    res.render('signupdater', errorObj)
  } else if (req.query.error === 'error2') {
    errorObj.error = true,
    errorObj.error = 'Passwords do not match, try again.';
    res.render('signupdater', errorObj)
  } else if (req.query.error === 'error3') {
    errorObj.activeUserError = true;
    res.render('signupdater', errorObj)
  } else if (req.query.error === 'error4') {
    errorObj.error = true,
    errorObj.message = 'Error, please try again.'
  }
})

signupDaterRouter.post('/signupdater', (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
    res.render('/signupdater/?error=error1')
  } else if (req.body.password !== req.body.confirmPassword) {
    res.render('/signupdater/?error=error2')
  } else {
    return selectDaterEmail(selectDaterEmailText, [req.body.email])
    .then(result => {
      if (result === req.body.email) {
        res.render('/signupdater/?error=error3')
      } else {
        return insertDater(insertDaterText, [req.body.email, req.body.password, req.body.face_image, req.body.body_image, req.body.description])
        .then(result => next())
        .catch(error => {
          console.log(error)
          res.set(500).render('/signupdater/?error=error4')
        })
      }
    })
  }
})

signupDaterRouter.post('/signupdater', (req, res) => {
  req.session.email = req.body.email
  res.render('/')
})

module.exports = signupDaterRouter
