const express = require("express");
const twilioController = require("../controllers/twilioController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "/api route ping" });
});

//

// USERS
// create user
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // TODO: Create a user in the database

    res.status(200).json({ name, email });
  } catch (e) {
    console.log({ error });
    return next({
      log: `Error caught in POST users. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    // verify user and password, and return the name
    res.status(200).json({ name, email });
  } catch (e) {
    console.log({ error });
    return next({
      log: `Error caught in POST users. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
});

// CONVERSATIONS
// create conversation
router.post("/conversations", async (req, res, next) => {
  try {
    // TODO: Create a conversation in the database
    res.status(200);
  } catch (e) {
    console.log({ error });
    return next({
      log: `Error caught in POST conversations. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
});

// VIDEO
router.post("/video-chat", twilioController.startVideoChat, (req, res) => {
  res.status(200).json({ message: "video chat created " });
});

// WHATSAPP

module.exports = router;
