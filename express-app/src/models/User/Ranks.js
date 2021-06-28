const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");

const Rank = db.sequelize.define('Rank', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    permission : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge : {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
    tableName: 'ranks',
});


module.exports = {
  Rank,
}