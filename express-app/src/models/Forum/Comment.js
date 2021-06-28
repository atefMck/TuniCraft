const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");

const Comment = db.sequelize.define('Comment', {
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      unique: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {tableName: 'comments'});

module.exports = {
    Comment,
}
