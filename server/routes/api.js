const express = require("express");
const {
  jwt: { AccessToken },
} = require("twilio");

const twilioController = require("../controllers/twilioController");
const userController = require("../controllers/userController");
const router = express.Router();

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// USERS
// create user
router.post("/register", userController.signUp, (req, res, next) => {
  const { user } = res.locals;
  res.status(200).json(user); // MAKE SURE THAT UNIQUE USERNAME IS TAKEN INTO ACCOUNT ON THE FRONTEND
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
router.post("/video-chat", twilioController.startVideoChat);

// // WHATSAPP

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */

router.post("/video/token", function (req, res) {
  const { identity, room } = req.body;

  const VideoGrant = AccessToken.VideoGrant;

  // Max. period that a Participant is allowed to be in a Room (currently 14400 seconds or 4 hours)
  const MAX_ALLOWED_SESSION_DURATION = 14400;

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { ttl: MAX_ALLOWED_SESSION_DURATION }
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  const grant = new VideoGrant();
  token.addGrant(grant);

  console.log({ token });

  // Serialize the token to a JWT string.
  res.send(token.toJwt());
});

module.exports = router;
