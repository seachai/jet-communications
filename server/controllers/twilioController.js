const AccessToken = require("twilio").jwt.AccessToken;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accessToken = process.env.TWILIO_ACCESS_TOKEN;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);

const twilioController = {};

twilioController.verifyNumber = (req, res, next) => {
  const { phone } = req.query;
  res.locals.phone = phone;
  try {
    client.messages
      .create({
        from: phoneNumber,
        body: "Reply to this text to resume your conversation.",
        to: phone,
      })
      .then((message) => console.log(message.sid));
    next();
  } catch (e) {
    return next({
      log: `Error caught in twilioController.sendText. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

twilioController.sendText = (req, res, next) => {
  const { phone, message } = req.body.data;
  try {
    client.messages
      .create({ from: phoneNumber, body: message, to: phone })
      .then((message) => console.log(message.sid));
    res.status(200).json({ sid: message.sid });
  } catch (e) {
    return next({
      log: `Error caught in twilioController.sendText. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};
twilioController.getToken = (req, res, next) => {
  try {
    const { identity, room } = req.body;

    const VideoGrant = AccessToken.VideoGrant;

    // Max. period that a Participant is allowed to be in a Room (currently 14400 seconds or 4 hours)
    const MAX_ALLOWED_SESSION_DURATION = 14400;

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.

    const token = new AccessToken(accountSid, apiKey, apiSecret, {
      ttl: MAX_ALLOWED_SESSION_DURATION,
    });

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    const grant = new VideoGrant({
      room,
    });
    token.addGrant(grant);

    console.log(token.toJwt());

    // Serialize the token to a JWT string.
    // res.send(token.toJwt());
    res.send(accessToken);
  } catch (e) {
    return next({
      log: `Error caught in userController.authenticateUser. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

module.exports = twilioController;
