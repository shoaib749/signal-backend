const express = require('express');

const router = express.Router();
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const { addChat } = require("../controllers/addChat");
const { showChat } = require("../controllers/showChat");
const { addMessage } = require("../controllers/addMessage");
const { showMessage } = require("../controllers/showMessage");

router.post('/register', register); //POST request to register the user
router.post('/login', login); // POST request to login the user
router.post("/addChat", addChat);
router.post("/showChat", showChat);
router.post("/addMessage", addMessage);
router.post("/showMessage", showMessage);

module.exports = router;