const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/create", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
