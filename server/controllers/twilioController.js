const { connect } = require("twilio-video");
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const apiKey = process.env.TWILIO_API_KEY;
// const apiSecret = process.env.TWILIO_API_SECRET;

const client = require("twilio")(
  "ACb062bc2266d0681bed2af3c4c68450bd",
  "ab660c50f671307086a8d55f9d2a3d52"
);

// const twilioController = {};

twilioController.startVideoChat = (req, res, next) => {
  const roomName = new Date().now;
  client.video.rooms
    .create({ uniqueName: roomName })
    .then((room) => {
      console.log("Video chat room created: ", room.sid);
      res.status(200).json({ message: "Video chat started", room: room.sid });
      return next();
    })
    .catch((e) => console.log({ e }));
};

// module.exports = twilioController;
