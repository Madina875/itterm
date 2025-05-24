const {
  create,
  loginAuthor,
  getAll,
  getById,
  update,
  remove,
  logoutAuthor,
  refreshAuthorToken,
  authorActivate,
} = require("../controllers/author.controller");
const authorJwtGuard = require("../middleware/guards/author-jwt.guard");
const authorSelfGuard = require("../middleware/guards/author-self.guard");

const router = require("express").Router();
router.post("/create", create);
router.get("/", getAll);
router.post("/login", loginAuthor);

router.post("/refresh", refreshAuthorToken);
router.get("/activate/:link", authorActivate);

router.get("/logout", logoutAuthor);
router.get("/:id", authorJwtGuard, authorSelfGuard, getById);
router.patch("/:id", authorJwtGuard, authorSelfGuard, update);
router.delete("/:id", authorJwtGuard, authorSelfGuard, remove);

module.exports = router;
