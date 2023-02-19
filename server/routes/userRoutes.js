const {login, register, userContacts} = require("../controller/userController")
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/contacts/:id", userContacts);

module.exports = router