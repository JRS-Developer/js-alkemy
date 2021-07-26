const router = require("express").Router();
const { authUser, createUser } = require("../controllers/auth.controller");

router.route("/register").post(createUser);
router.route("/login").post(authUser);

module.exports = router;
