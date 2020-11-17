const { connect } = require("twilio-video");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

const client = require("twilio")(accountSid, authToken);

const twilioController = {};

twilioController.startVideoChat = (req, res, next) => {
  console.log("starting video chat");
};

twilioController.generateAccessToken = () => {
  const AccessToken = require("twilio").jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  function tokenGenerator(identity, room) {
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(accountSid, apiKey, apiSecret);

    // Assign identity to the token
    token.identity = identity;

    // Grant the access token Twilio Video capabilities
    const grant = new VideoGrant();
    grant.room = room;
    token.addGrant(grant);

    // Serialize the token to a JWT string
    return token.toJwt();
  }

  module.exports = tokenGenerator;
};

module.exports = twilioController;
