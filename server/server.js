const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const cors = require("cors");

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const apiRouter = require("./routes/api");
// server
const server = express();
const PORT = process.env.PORT || 3001;

// SET UP
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// SEND API CALLS TO API ROUTER
server.use("/api", apiRouter);

// REGULAR ROUTES
server.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

server.get("/welcome", (req, res) => {
  res.status(200).json({ message: "Successfully authenticated" });
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
  origins: ["http://127.0.0.1:8080", "https://f7fb87b6cb5b.ngrok.io/"],
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
