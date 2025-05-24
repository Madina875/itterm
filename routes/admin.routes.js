const {
  create,
  loginAdmin,
  getAll,
  getById,
  update,
  remove,
  logoutAdmin,
  refreshAdminToken,
  adminActivate,
} = require("../controllers/admin.controller");
const adminJwtGuard = require("../middleware/guards/admin-jwt.guard");
const adminSelfGuard = require("../middleware/guards/admin-self.guard");

const router = require("express").Router();

router.post("/create", create);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/", getAll);

router.post("/refresh", refreshAdminToken);
router.get("/activate/:link", adminActivate);

router.get("/:id", adminJwtGuard, adminSelfGuard, getById); // agar boshqa id dan kirilsa malumotlarni korsatmaydi
router.patch("/:id", adminJwtGuard, adminSelfGuard, update);
router.delete("/:id", adminJwtGuard, adminSelfGuard, remove);

module.exports = router;
