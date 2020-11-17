const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./database/model.js");
const queryTypes = require("./database/queryTypes.js");

// SET UP ENV VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// server
const server = express();
const PORT = process.env.PORT || 3000;

// DATABASE CHECK
const userSignUp = () => {
  console.log("userSignUp function is working")
  query(
    queryTypes.INSERT_USERS,
    ['admin/user', 'Anton', 'Abdukhamidov', 'Anton Abdukhamidov', 'Password', 1],   // (role, given_name, family_name, usernam, password, conversation_id)
    (err, res) => {
      if (err) {
        console.log(`Error in INSERT_USERS. Error: ${err}`);
      } else {
        console.log("** INSERT_USERS returned: **", res);
      }
    }
  );
}
userSignUp()

// SET UP
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// // API ROUTER
// const apiRouter = require("./routes/api");

// // SEND API CALLS TO API ROUTER
// server.use("/api", apiRouter);

// REGULAR ROUTES
server.get("/", (req, res) => {
  console.log('process.env.ELEPHANTPASSWORD: ', process.env.ELEPHANTPASSWORD);
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

server.listen(PORT);

console.log("NODE_ENV mode is", process.env.NODE_ENV);

console.log("Remember to check your .env file if you cannot connect to the database");

console.log(`Server is listening at http://localhost:${PORT}`);
console.log(`Client is live at http://localhost:8080`);
