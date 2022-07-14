const jwt = require('jsonwebtoken')

let auth = (req, res, next) => {
  const token = req.header('autorization-token')
  if (!token) return res.status(400).send('Access Denied.')

  try {
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    res.user = userVerified
    next()
  } catch (error) {
    return res.status(400).send('Access Denied.')
  }
}

module.exports = auth
