const express = require('express')
const Category = require("../../models/Forum/Category").Category;
const authenticateToken = require('../../../utils/Token').authenticateToken

const categoryRouter = express.Router()

categoryRouter.get('/:id?', (req, res) => {
  if (!req.query.id) {
    Category.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err || "Internal server error has occured."
      });
    });
  } else {
    Category.findOne({where: {id: req.query.id}})
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send({message: "Category doesn't exist"});
      }
    })
    .catch(err => {
      res.status(400).send({
        message:
          err || "Internal server error, try again later"
      });
    });
  }
  
})

categoryRouter.post('/', authenticateToken, (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const category = {
    name: req.body.name,
    description: req.body.description,
  }

  Category.create(category)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err || "Internal server error has occured."
    });
  });
})

categoryRouter.put('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Category.findOne({where: {id: req.body.id}})
  .then((category) => {
    category.name = req.body.name || category.name
    category.description = req.body.description || category.description
    category.save()
    res.status(200).send({message: "Category successfuly updated"})
  }).catch(err => {
    res.status(400).send({message: "Bad request"})
  })

})

categoryRouter.delete('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Category.findOne({where: {id: req.body.id}})
  .then(category => {
    category.destroy()
    res.status(200).send({message: "Category successfully deleted"})
  }).catch(() => {
    res.status(400).send({message: "Bad request"})
  })
})


module.exports = categoryRouter;