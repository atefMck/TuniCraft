const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");

const UserSettings = db.sequelize.define('UserSettings', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    bio: {
        type: DataTypes.STRING,
        validate: {
            max: {
                args: 100,
                msg: "Bio too long."
            },
            min: {
                args: 1,
                msg: "Bio too short."
            }
        }
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "https://crafatar.com/avatars/5e9dd1a9-2e43-4075-a759-74a9bc079c3b",
    },
    banner: {
      type: DataTypes.STRING,
      defaultValue: "https://media.distractify.com/brand-img/WqjR70R8O/0x0/minecraft-cover-1577809353241.png",
    }
});

const UserPrivacy = db.sequelize.define('UserPrivacy', {
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      unique: true
  },
  show_online: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  recieve_news: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  view_details: {
    type: DataTypes.ENUM('all', 'members', 'friends', 'none'),
    defaultValue: 'all',
  },
  post_on_profile: {
    type: DataTypes.ENUM('all', 'members', 'friends', 'none'),
    defaultValue: 'all',
  },
  see_profile: {
    type: DataTypes.ENUM('all', 'members', 'friends', 'none'),
    defaultValue: 'all',
  },
  start_conv: {
    type: DataTypes.ENUM('all', 'members', 'friends', 'none'),
    defaultValue: 'all',
  },
  view_identity: {
    type: DataTypes.ENUM('all', 'members', 'friends', 'none'),
    defaultValue: 'all',
  },
});

module.exports = {
  UserSettings,
  UserPrivacy
}