const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const apiRouter = require("./routes/api");
const cors = require("cors");
const {
  jwt: { AccessToken },
} = require("twilio");

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// server
const server = express();
const PORT = process.env.PORT || 3001;

// SET UP
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// API ROUTER
const apiRouter = require("./routes/api");

// SEND API CALLS TO API ROUTER
server.use("/api", apiRouter);

// REGULAR ROUTES
server.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

server.get("/welcome", (req, res) => {
  res.status(200).json({ message: "Successfully authenticated" });
});

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
server.get("/video/token", function (req, res) {
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

  // Serialize the token to a JWT string.
  res.send(token.toJwt());
});

// ERROR HANDLER
server.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error: Unknown middleware",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, err };

  console.log("ERROR LOG => ", errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === "production") {
  server.use("/build", express.static(path.join(__dirname, "../build")));
  // serve index.html on the route '/'
  server.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
}

const serverPort = server.listen(PORT);

const io = socketIO(serverPort, {
  cors: true,
  origins: ["http://127.0.0.1:8080"],
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send-message", (data) => {
    socket.broadcast.emit("reply-message", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

/**
 * Admin connects
 * User connects
 *
 * Admin ends chat
 * Client -> chat data -> server
 * Server -> write the logs into the database
 *
 * Conversation (
 * timestamp
 * recipient_id
 * sender_id
 * messages -> FK
 * )
 */
