const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/desctopic.controller");

const router = require("express").Router();

router.post("/create", create);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
