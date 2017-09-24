const router = require("express").Router();
const articlesRoutes = require("./articles");

// Article routes
router.use("/articles", articlesRoutes);

module.exports = router;
