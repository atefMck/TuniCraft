const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");

const Thread = require("./Thread").Thread;

const SubCategory = db.sequelize.define('SubCategory', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.*[A-Z0-9])[\w.,!"'\/$ ]+$/i,
                msg: "Invalid sub category name."
            },
            max: {
                args: 40,
                msg: "Sub category name too long."
            },
            min: {
                args: 5,
                msg: "Sub category name too short."
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.*[A-Z0-9])[\w.,!"'\/$ ]+$/i,
                msg: "Invalid description."
            },
            max: {
                args: 40,
                msg: "Description too long."
            },
            min: {
                args: 15,
                msg: "Description too short."
            }
        }
    },
}, {tableName: 'sub_categories'});

SubCategory.hasMany(Thread, {as: 'threads', foreignKey: {name: 'subCategoryId', allowNull: false}});

module.exports = {
    SubCategory,
}
