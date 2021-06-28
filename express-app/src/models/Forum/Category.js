const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");

const SubCategory = require("./SubCategory").SubCategory;

const Category = db.sequelize.define('Category', {
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
                msg: "Invalid category name."
            },
            max: {
                args: 40,
                msg: "Category name too long."
            },
            min: {
                args: 5,
                msg: "Category name too short."
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
}, {tableName: 'categories'});

Category.hasMany(SubCategory, {as: 'sub_categories', foreignKey: {name: 'categoryId', allowNull: false}});

module.exports = {
    Category,
}
