const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/description.controller");

const router = require("express").Router();

router.post("/create", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.put("/:id", remove);

module.exports = router;
