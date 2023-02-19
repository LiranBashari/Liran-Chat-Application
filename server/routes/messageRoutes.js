const {addMessage, getMessages} = require("../controller/messageController")
const router = require("express").Router();

router.post("/addmessage", addMessage);
router.post("/getmessage", getMessages);

module.exports = router