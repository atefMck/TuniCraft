const User = require('../models/User').User;
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
  };
  
  User.create(user)
    .then( data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.errors[0].message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err || "Some error occurred while creating the User."
      });
    });
};

exports.findOne = (req, res) => {
  console.log(req.user.data)
  User.findOne({where: {uuid : req.user.data}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err || "Some error occurred while creating the User."
      });
    });
};
