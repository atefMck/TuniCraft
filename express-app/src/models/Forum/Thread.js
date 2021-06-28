const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");
const Comment = require("./Comment").Comment;

const Thread = db.sequelize.define('Thread', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        is: {
            args: /^(?=.*[A-Z0-9])[\w.,!"'\/$ ]+$/i,
            msg: "Invalid title."
        },
        max: {
            args: 35,
            msg: "Title too long."
        },
        min: {
            args: 10,
            msg: "Title too short."
        }
    }
  },
  content: {
    type: Sequelize.TEXT('long'),
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
}, {tableName: 'threads'});

Thread.hasMany(Comment, {as: 'comments', foreignKey: {name: 'threadId', allowNull: false}});

module.exports = {
    Thread,
}
