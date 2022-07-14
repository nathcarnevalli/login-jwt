const express = require('express')
const router = express.Router()
const auth = require('../controller/authController')

router.get('/', auth, (req, res) => {
  if (res.user.admin) {
    res.send('Only admin can see this data.')
  } else {
    return res.status(400).send('Not admin: Access Denied.')
  }
})

module.exports = router
