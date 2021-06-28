const express = require('express')
const Thread = require("../../models/Forum/Thread").Thread;
const Comment = require("../../models/Forum/Comment").Comment;
const User = require("../../models/User").User;
const Rank = require("../../models/User/Ranks").Rank;
const authenticateToken = require('../../../utils/Token').authenticateToken

const threadRouter = express.Router()

threadRouter.get('/', (req, res) => {
  if (!req.query.title) {
    Thread.findAll()
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
    Thread.findOne({where: {title: req.query.title}, include: [{model: User, as: "user", include: {model: Rank}}, {model: Comment, as: "comments", include: "user"}]})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send({
        message:
          err || "Thread doesn't exist"
      });
    });
  }
  
})

threadRouter.post('/', authenticateToken, (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const thread = {
    title: req.body.title,
    content: req.body.content,
    userId: req.userId.id,
    subCategoryId: req.body.subCategoryId
  }
  Thread.create(thread)
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

threadRouter.put('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Thread.findOne({where: {id: req.body.id}})
  .then((thread) => {
    if (thread.userId === req.user.data) {
      thread.title = req.body.title || thread.title
      thread.content = req.body.content || thread.content
      thread.save()
      res.status(200).send({message: "Thread successfuly updated"})
    } else {
      res.status(400).send({message: "Bad request"})
    }
    
  }).catch(err => {
    res.status(400).send({message: "Bad request"})
  })

})

threadRouter.delete('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Thread.findOne({where: {id: req.body.id}})
  .then(thread => {
    if (req.user.data === thread.userId) {
      thread.destroy()
      res.status(200).send({message: "Thread successfully deleted"})
    } else {
      res.status(400).send({message: "Unauthorized"})
    }
  }).catch(() => {
    res.status(400).send({message: "Bad request"})
  })
})


module.exports = threadRouter;