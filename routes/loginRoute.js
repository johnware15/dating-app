const express = require('express')
const loginDaterRouter = express.Router()

const {
  selectDater,
  selectDaterText
} = require('../queries/login.js')

loginDaterRouter.get('/daterlogin', (req, res) => {
  let errorObj = {
    error: false,
    message: '',
  }
  if(req.session.email) {
    res.redirect('/')
  }

  if(!req.query.error) {
    res.render('daterlogin', errorObj)
  } else if (req.query.error === 'error1') {
    errorObj.error = true;
    errorObj.message = 'Please identify yourself';
    res.render('daterlogin', errorObj);
  } else if (req.query.error === 'error2') {
    errorObj.error = true;
    errorObj.message = 'Email or password was incorrect. Do it over.';
    res.render(dater)
  } else if (res.query.error === 'error3') {
    errorObj.error = true;
    errorObj.message = 'Error, please try again.';
  }
})

loginDaterRouter.post('/daterlogin', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.render('daterlogin/?error=error1');
  } else {
    return selectDater(selectDaterText, [req.body.email], req.body.password)
    .then(result => {
      if (result === true) {
        next()
      } else {
        res.direct('/daterlogin/?error=error2')
      }
    })
  .catch(error => {
      console.log(error)
      res.status(500).redirect('/daterlogin/?error=error3')
    })
  }
})

loginDaterRouter.post('/daterlogin', (req, res) => {
  req.session.email = req.body.email;
  res.render('/');
})

module.exports = loginDaterRouter;
