const express = require('express')

const Category = require("../../models/Forum/Category").Category;
const SubCategory = require("../../models/Forum/SubCategory").SubCategory;
const Thread = require("../../models/Forum/Thread").Thread;

const threadRouter = require("./Thread");
const categoryRouter = require("./Category");
const commentRouter = require("./Comment");
const subCategoryRouter = require("./SubCategory");
const router = express.Router()

router.use('/threads', threadRouter)
router.use('/categories', categoryRouter)
router.use('/comments', commentRouter)
router.use('/subcategories', subCategoryRouter)

router.get('/', (req, res) => {
  Category.findAll({include: [
    {model: SubCategory, as: "sub_categories", include: [
      {model: Thread, as: "threads", include: "comments"}
    ]}
  ],
  order: [[
    {model: SubCategory, as: 'sub_categories'},
    {model: Thread, as: 'threads'},
    'updatedAt',
    'DESC'
  ]]
  })
  .then(data => {
    res.status(200).send(data)
  }).catch(err => {
    res.status(400).send(err)
  })
})

module.exports = router;