const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = Model.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  hooks: {
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
    },
    async beforeUpdate(updatedUserData) {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user'
});


module.exports = User;