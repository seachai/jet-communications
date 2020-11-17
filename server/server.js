const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./database/model.js");
const queryTypes = require("./database/queryTypes.js");
const socketIO = require("socket.io");
const cors = require("cors");

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// server
const server = express();
const PORT = process.env.PORT || 3001;

// DATABASE CHECK
// 1. USER INFO IS SAVED - OK
// const userSignUp = () => {
//   query(
//     queryTypes.INSERT_USERS,
//     ['admin', 'Anton', 'Abdukhamidov', 'Anton Abdukhamidov', 'Password'],   // (role, given_name, family_name, username, password)
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

//2. MESSAGE INFO IS SAVED
  // 2.0 retrieve right user_id and admin_id from DB based on username information
  // 2.1 CONVERSATION IS CREATED PROPERLY - OK
  // const convCreate = () => {
  //   query(
  //     queryTypes.CREATE_CONVERSATION,
  //     ['user_id TEST', 'admin_id TEST'],   // (user_id, admin_id)
  //     (err, res) => {
  //       if (err) {
  //         console.log(`Error in CREATE_CONVERSATION. Error: ${err}`);
  //       } else {
  //         // console.log("** CREATE_CONVERSATION returned: **", res);
  //       }
  //     }
  //   );
  // }
  // convCreate()

  // 2.2 SAVING MESSAGES SENT TO 
    const saveMessage = () => {
    query(
      queryTypes.INSERT_MESSAGE,
      ['message TEST'],   // (message)
      (err, res) => {
        if (err) {
          console.log(`Error in INSERT_MESSAGE. Error: ${err}`);
        } else {
          // console.log("** INSERT_MESSAGE returned: **", res);
        }
      }
    );
  }
  saveMessage()

// SET UP
// server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// // API ROUTER
const apiRouter = require("./routes/api");

// // SEND API CALLS TO API ROUTER
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
  origins: ["http://127.0.0.1:8080"],
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send-message", (data) => {
    socket.broadcast.emit("reply-message", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});
