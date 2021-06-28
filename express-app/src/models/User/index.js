const { DataTypes, Sequelize } = require('sequelize');
const db = require("../../database/db");
const bcrypt = require('bcryptjs');

const Rank = require("./Ranks").Rank;
const UserSettings = require("./Settings").UserSettings;
const UserPrivacy = require("./Settings").UserPrivacy;

const Thread = require("../Forum/Thread").Thread;
const Comment = require("../Forum/Comment").Comment;

const User = db.sequelize.define('User', {
    id: {
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
        unique: true,
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
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Invalid Email"
            },
        },
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
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'users',
    hooks: {
        beforeCreate: function(user) {
            const salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)
        }
    }
});

UserVerify = db.sequelize.define('UserVerify', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {tableName: 'user_verify'});

// {hooks: {
//     afterCreate: (instance) => {
//         const expire = 1000 * 60 * 15
//         setTimeout(() => {
//             instance.destroy()
//         }, expire)
//     }
// }}

UserRanks = db.sequelize.define('UserRanks', {
}, {tableName: 'user_ranks'});

User.belongsToMany(Rank, {through: UserRanks})
User.hasOne(UserSettings, {as: 'settings', foreignKey: {name: 'userId', allowNull: false}});
User.hasOne(UserPrivacy, {as: 'privacy', foreignKey: {name: 'userId', allowNull: false}});
User.hasMany(Thread, {as: 'threads', foreignKey: {name: 'userId', allowNull: false}});
User.hasMany(Comment, {as: 'comments', foreignKey: {name: 'userId', allowNull: false}});
Comment.belongsTo(User, {as: 'user', foreignKey: {name: 'userId', allowNull: false}});
Thread.belongsTo(User, {as: 'user', foreignKey: {name: 'userId', allowNull: false}});

module.exports = {
    User,
    UserVerify
}