const dictRouter = require("./dict.routes");
const catRouter = require("./category.routes");
const descRouter = require("./desc.routes");
const socRouter = require("./social.routes");
const synRouter = require("./syn.routes");
const aurRouter = require("./author.routes");
const tagRouter = require("./tag.routes");
const topicRouter = require("./topic.routes");
const desctopRuter = require("./desctopic.routes");
const userRouter = require("./user.routes");
const adminRouter = require("./admin.routes");
const router = require("express").Router();

router.use("/dict", dictRouter);
router.use("/category", catRouter);
router.use("/desc", descRouter);
router.use("/soc", socRouter);
router.use("/syn", synRouter);
router.use("/author", aurRouter);
router.use("/tag", tagRouter);
router.use("/topic", topicRouter);
router.use("/desct", desctopRuter);
router.use("/admin", adminRouter);
router.use("/user", userRouter);

module.exports = router;

//dict , cat
//desc , soc , syn
