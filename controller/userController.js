const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validate = require('./validate')

const userController = {
  user: require('../models').User,
  register: async (req, res) => {
    const { error } = validate.registerValidade(req.body)
    if (error) return res.status(400).send(error.message)

    let user = userController.user

    if (await user.findOne({ where: { email: req.body.email } }))
      return res.status(400).json({
        error: true,
        message: 'Error'
      })

    await user
      .create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(() =>
        res.json({
          error: false,
          message: 'User successfully registered.'
        })
      )
      .catch(() =>
        res.status(400).json({
          error: true,
          message: 'Error while user has been registering.'
        })
      )
  },
  login: async (req, res) => {
    const { error } = validate.loginValidade(req.body)
    if (error) return res.status(400).send(error.message)

    const selectedUser = await userController.user.findOne({
      where: { email: req.body.email }
    })

    if (!selectedUser) return res.status(400).send('Email or password invalid')

    let matchPass = bcrypt.compareSync(req.body.password, selectedUser.password)

    if (!matchPass) return res.status(400).send('Email or password invalid')

    const token = jwt.sign(
      { id: selectedUser.id, admin: selectedUser.admin },
      process.env.TOKEN_SECRET
    )

    console.log(token)
    res.header('autorization-token', token)
    res.send('User logged!')
  }
}

module.exports = userController
