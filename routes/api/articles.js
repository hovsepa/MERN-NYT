const router = require("express").Router();
const articleController = require("../../controllers/articleController");


console.log('hi from route file');
// Matches with "/api/books"
console.log(router.route);

// /articles/articles
router.route("/articles")
  .get(articleController.findAll);

router.route("/saved")
  .get(articleController.findAll)
  .post(articleController.create);

router.route("/:id")
  .get(articleController.findById)
  // .put(booksController.update)
  .delete(articleController.remove);

// // Matches with "/api/books/:id"
// router.route("/:id")
//   .get(articleController.findById)
//   .put(articleController.update)
//   .delete(articleController.remove);

module.exports = router;