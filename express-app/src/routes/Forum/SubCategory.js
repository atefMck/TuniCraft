const express = require('express')
const SubCategory = require("../../models/Forum/SubCategory").SubCategory;
const authenticateToken = require('../../../utils/Token').authenticateToken

const Thread = require("../../models/Forum/Thread").Thread;
const Comment = require("../../models/Forum/Comment").Comment;
const User = require("../../models/User").User;

const subCategoryRouter = express.Router()

subCategoryRouter.get('/:name?', (req, res) => {
  if (!req.query.name) {
    SubCategory.findAll()
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
    SubCategory.findOne({where: {name: req.query.name}, include: [
      {model: Thread, as: "threads", include: [
        {model: Comment, as: "comments"}, {model: User, as: "user"}
      ]}]})
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send({message: "Sub category doesn't exist"});
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

subCategoryRouter.post('/', authenticateToken, (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const category = {
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId
  }

  SubCategory.create(category)
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

subCategoryRouter.put('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  SubCategory.findOne({where: {id: req.body.id}})
  .then((subCategory) => {
    subCategory.name = req.body.name || subCategory.name
    subCategory.description = req.body.description || subCategory.description
    subCategory.save()
    res.status(200).send({message: "Sub category successfuly updated"})
  }).catch(err => {
    res.status(400).send({message: "Bad request"})
  })

})

subCategoryRouter.delete('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  SubCategory.findOne({where: {id: req.body.id}})
  .then(category => {
    category.destroy()
    res.status(200).send({message: "Sub category successfully deleted"})
  }).catch(() => {
    res.status(400).send({message: "Bad request"})
  })
})


module.exports = subCategoryRouter;