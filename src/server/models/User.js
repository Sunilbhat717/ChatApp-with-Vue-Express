'use strict';
const bcrypt = require('bcrypt')

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
    toJSON() {
      let values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      min: 3,
      max: 15
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        }
      },
      min: 5,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: function (value) {
          if (!/^[a-zA-z0-9]+$/.test(value)) {
            throw new Error('Invalid username given')
          }
        }
      },
      min: 3,
      max: 50
    },
    password: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        is: function (value) {
          if (!/.{8,25}$/.test(value)) {
            throw new Error('Password must be 8 to 25 character long')
          }
        }
      }
    }
  },
    {
      sequelize,
      modelName: 'user'
    })

  User.beforeSave(async (user) => {
    if (!user.changed('password')) {
      return
    }
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(12))
  })

  return User
}