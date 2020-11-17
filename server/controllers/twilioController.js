const { connect } = require("twilio-video");
const twilioController = {};

module.exports = twilioController;

twilioController.startVideoChat = (req, res, next) => {
  connect("$TOKEN", { name: "my-new-room" }).then(
    (room) => {
      console.log(`Successfully joined a Room: ${room}`);
      room.on("participantConnected", (participant) => {
        console.log(`A remote Participant connected: ${participant}`);
      });
      return next;
    },
    (e) => {
      console.e(`Unable to connect to Room: ${e.message}`);
      return next({
        log: `Error caught in startVideoChat controller. \n Error Message: ${e.errmsg || e}`,
        message: { err: e.errmsg || e },
      });
    }
  );
};
