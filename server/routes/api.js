const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "/api route ping" });
});

// USERS
// create user
router.post("/users", async (req, res, next) => {
  try {
    // TODO: Create a user in the database

    res.status(200);
  } catch (error) {
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
  } catch (error) {
    console.log({ error });
    return next({
      log: `Error caught in POST conversations. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
});

// VIDEO
router.post("/video-chat", async (req, res, next) => {
  try {
    // TODO: Insantiate a video chat on Twilio
  } catch (error) {
    console.log({ error });
    return next({
      log: `Error caught in POST video-chat. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
});

// WHATSAPP

module.exports = router;
