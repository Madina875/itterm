const {
  create,
  getAll,
  getById,
  update,
  remove,
  login,
  refresh,
  logout,
} = require("../controllers/dict.controller");
const dictJwtGuard = require("../middleware/guards/dict-jwt.guard");

const router = require("express").Router();

router.post("/create", create);
router.get("/", getAll);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/:id", dictJwtGuard, getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
