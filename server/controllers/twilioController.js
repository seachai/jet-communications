const AccessToken = require("twilio").jwt.AccessToken;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

// const client = require("twilio")(
//   "ACb062bc2266d0681bed2af3c4c68450bd",
//   "ab660c50f671307086a8d55f9d2a3d52"
// );

const twilioController = {};

// twilioController.createRoom = (req, res, next) => {
//   const roomName = Date.now();
//   client.video.rooms
//     .create({ uniqueName: roomName })
//     .then((room) => {
//       console.log("Video chat room created: ", room.sid);
//       return res.status(200).json({ message: "Video chat started", room: room });
//     })
//     .catch((error) => {
//       return next({
//         log: `twilioController.createRoom: ${error.message}`,
//         message: {
//           err: "Error occurred in twilioController.createRoom. Check server logs for details.",
//         },
//       });
//     });
// };

twilioController.getToken = (req, res, next) => {
  console.log(req.body);
  console.log({ accountSid });
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
    const grant = new VideoGrant();
    token.addGrant(grant);

    console.log({ token });

    // Serialize the token to a JWT string.
    res.send(token.toJwt());
  } catch (e) {
    return next({
      log: `Error caught in userController.authenticateUser. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

module.exports = twilioController;
