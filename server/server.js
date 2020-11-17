const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./database/model.js");
const queryTypes = require("./database/queryTypes.js");
const socketIO = require('socket.io');
const cors = require("cors");

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// server
const server = express();
const PORT = process.env.PORT || 3001;

// DATABASE CHECK
// const userSignUp = () => {
//   query(
//     queryTypes.INSERT_USERS,
//     ['admin/user', 'Anton', 'Abdukhamidov', 'Anton Abdukhamidov', 'Password', 1],   // (role, given_name, family_name, usernam, password, conversation_id)
//     (err, res) => {
//       if (err) {
//         console.log(`Error in INSERT_USERS. Error: ${err}`);
//       } else {
//         // console.log("** INSERT_USERS returned: **", res);
//       }
//     }
//   );
// }
// userSignUp()

// SET UP
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// // API ROUTER
// const apiRouter = require("./routes/api");

// // SEND API CALLS TO API ROUTER
// server.use("/api", apiRouter);

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
const io = socketIO(serverPort);

io.on("connection", (socket) => {
  // sending to all clients except sender
  // socket.broadcast.emit('broadcast', 'hello friends!');

  socket.on("send-message", (data) => {
    console.log(data);
  })
})