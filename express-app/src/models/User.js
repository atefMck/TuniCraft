const { DataTypes, Sequelize } = require('sequelize');
const db = require(".");
const bcrypt = require('bcryptjs');

const User = db.sequelize.define('User', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[a-zA-Z_ ]*$/g,
                msg: "Invalid firstname."
            },
            max: {
                args: 20,
                msg: "Firstname too long."
            },
            min: {
                args: 1,
                msg: "Firstname too short."
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /[A-Z]+([ '-][a-zA-Z]+)*/g,
                msg: "Invalid lastname."
            },
            max: {
                args: 40,
                msg: "Lastname too long."
            },
            min: {
                args: 1,
                msg: "Lastname too short."
            }
        }
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Username already taken."
        },
        validate: {
            is: {
                args: /^\w+$/i,
                msg: "Invalid username."
            },
            max: {
                args: 16,
                msg: "Username too long."
            },
            min: {
                args: 3,
                msg: "Username too short."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email already taken."
        },
        validate: {
            isEmail: {
                args: true,
                msg: "Invalid Email."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /((\+|00)216)?[0-9]{8}/i,
                msg: "Invalide phone number."
            }
        }
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: "Invalid date of birth."
            },
            isAfter: { 
                args: "1910-01-01",
                msg: "Invalid date of birth."
            },
            isBefore: {
                args: "2017-01-01",
                msg: "Invalid date of birth."
            }
        }
    }
}, {
    tableName: 'users',
    hooks: {
        beforeCreate: function(user, options) {
            const salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)
          }
        }
});
module.exports = {
    User,
}