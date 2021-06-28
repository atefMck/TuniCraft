const express = require('express')
const Comment = require("../../models/Forum/Comment").Comment;
const authenticateToken = require('../../../utils/Token').authenticateToken

const commentRouter = express.Router()

commentRouter.get('/', (req, res) => {
  if (!req.body.id) {
    Comment.findAll()
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
    Comment.findOne({where: {id: req.body.id}})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send({
        message:
          err || "Comment doesn't exist"
      });
    });
  }
  
})

commentRouter.post('/', authenticateToken, (req, res) => {
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const comment = {
    content: req.body.content,
    userId: req.userId.id,
    threadId: req.body.threadId
  }

  Comment.create(comment)
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

commentRouter.put('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Comment.findOne({where: {id: req.body.id}})
  .then((content) => {
    if (content.userId === req.user.data) {
      content.content = req.body.content || content.content
      content.save()
      res.status(200).send({message: "Thread successfuly updated"})
    } else {
      res.status(400).send({message: "Bad request"})
    }
  }).catch(err => {
    res.status(400).send({message: "Bad request"})
  })

})

commentRouter.delete('/', authenticateToken, (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Comment.findOne({where: {id: req.body.id}})
  .then(comment => {
    if (req.user.data === comment.userId) {
      comment.destroy()
      res.status(200).send({message: "Comment successfully deleted"})
    } else {
      res.status(400).send({message: "Unauthorized"})
    }
  }).catch(() => {
    res.status(400).send({message: "Bad request"})
  })
})

module.exports = commentRouter;