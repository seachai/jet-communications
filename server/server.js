// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const cors = require("cors");

// SERVER
const server = express();
const PORT = process.env.PORT || 3001;

// SET UP
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const apiRouter = require("./routes/api");
const twilioController = require("./controllers/twilioController");

// SEND API CALLS TO API ROUTER
server.use("/api", apiRouter);

// START THE SERVER
const serverPort = server.listen(PORT);

// SET UP SOCKETS
const io = socketIO(serverPort, {
  cors: true,
  origins: ["http://127.0.0.1:8080"],
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send-chat", (data) => {
    socket.broadcast.emit("receive-chat", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

server.get("/welcome", (req, res) => {
  res.status(200).json({ message: "Successfully authenticated" });
});

server.post("/sms/callback", (req, res) => {
  console.log("twilio cb");
  const response = {
    author: req.body.From,
    message: req.body.Body,
  };
  io.emit("receive-sms", response);
});

server.post("/sms/verify-number", twilioController.verifyNumber, (req, res) => {
  console.log("Verify number, changed SMS");
  io.emit("change-mode", { mode: "sms", phone: res.locals.phone });
  res.status(200).json({ message: "number verified" });
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
