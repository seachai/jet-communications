const express = require("express");
const twilioController = require("../controllers/twilioController");
const userController = require("../controllers/userController");
const router = express.Router();

// USERS
// create user
router.post("/register", userController.signUp, (req, res, next) => {
  const { user } = res.locals;
  res.status(200).json(user);
});

router.post("/login", userController.login, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.post("/message", userController.postMessage, (req, res, next) => {
  res.status(200).json("message is successfully saved to database");
});

router.get("/getMessages", userController.getMessages, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "/api route ping" });
});

// VIDEO
// router.post("/video-chat", twilioController.startVideoChat, (req, res) => {
//   res.status(200).json({ message: "video chat created " });
// });

// // WHATSAPP

module.exports = router;
