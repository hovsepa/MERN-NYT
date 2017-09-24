const router = require("express").Router();
// const bookRoutes = require("./books");
const articlesRoutes = require("./articles");

// Book routes
// router.use("/books", bookRoutes);
router.use("/articles", articlesRoutes);

module.exports = router;
