'use strict'

const sequelize = require('sequelize')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validade: {
          min: 3,
          max: 100
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validade: {
          min: 10,
          max: 100
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validade: {
          min: 6,
          max: 200
        }
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
