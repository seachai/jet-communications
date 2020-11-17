const express = require("express");
const twilioController = require("../controllers/twilioController");
const userController = require("../controllers/userController");
const router = express.Router();

// USERS
// create user
router.post("/register", userController.signUp, async (req, res) => {
  const { user } = res.locals;
  res.status(200).json(user);
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "/api route ping" });
});

// router.post("/login", (req, res) => {

//   try {
//     // verify user and password, and return the name
//     res.status(200).json({ name, email });
//   } catch (e) {
//     console.log({ error });
//     return next({
//       log: `Error caught in POST users. \n Error Message: ${e.errmsg || e}`,
//       message: { err: e.errmsg || e },
//     });
//   }
// });

// // CONVERSATIONS
// // create conversation
// router.post("/conversations", async (req, res, next) => {
//   try {
//     // TODO: Create a conversation in the database
//     res.status(200);
//   } catch (e) {
//     console.log({ error });
//     return next({
//       log: `Error caught in POST conversations. \n Error Message: ${e.errmsg || e}`,
//       message: { err: e.errmsg || e },
//     });
//   }
// });

// VIDEO
// router.post("/video-chat", twilioController.startVideoChat, (req, res) => {
//   res.status(200).json({ message: "video chat created " });
// });

// // WHATSAPP

module.exports = router;
