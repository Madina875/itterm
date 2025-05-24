const {
  create,
  getAll,
  getById,
  update,
  remove,
  login,
  logout,
  refresh,
} = require("../controllers/topic.controller");
const router = require("express").Router();
const topicJwtGuard = require("../middleware/guards/topic-jwt.guard");

router.post("/create", create);
router.get("/", getAll);
router.post("/login", login);
router.post("/", logout);
router.post("/", refresh);
router.get("/:id", topicJwtGuard, getById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
