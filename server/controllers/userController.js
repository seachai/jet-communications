const { receiveMessageOnPort } = require("worker_threads");
const query = require("../database/model.js");
const queryTypes = require("../database/queryTypes.js");
const userController = {};

userController.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  query(queryTypes.CHECK_USERNAME, [email]).then((data) => {
    // CHECK IF SIMILAR USERNAME EXISTS IN THE DATABASE
    // IF USERNAME IS FREE - MAKE A QUERY TO SAVE IT IN THE DB
    console.log("data.rows inside CHECK_USERNAME: ", data.rows);
    if (!data.rows[0]) {
      console.log("data from CHECK_USERNAME function", data.rows[0]);
      query(queryTypes.INSERT_USERS, [
        "user",
        name,
        "Abdukhamidov",
        email,
        password,
      ])
        .then((data) => {
          data = data.rows[0];
          res.locals.user = { name: data.given_name, email: data.username };
          return next();
        })
        .catch((error) => {
          console.log("error: ", error);
          return next({
            log: `userController.signUp.INSERT_USERS:  Error posting tasks data from data base:${error.status}`,
            message: {
              err:
                "Error occurred in userController.signUp.INSERT_USERS. Check server logs for details.",
            },
          });
        });
    }
    // IF USERNAME IS BUSY - SEND THIS INFORMATION TO THE FRONTEND
    else {
      res.locals.user = "please try another username";
      return next();
    }
  });
};

userController.login = (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;

  query(queryTypes.CHECK_USER, [username, password]) // (username, password)
    .then((data) => {
      const dataSent =
        data.rows.length === 0
          ? "wrong"
          : {
              name: data.rows[0].given_name,
              email: data.rows[0].username,
            };
      res.locals.data = dataSent;
      return next();
    })
    .catch((error) => {
      return next({
        log: `userController.login:  Error posting tasks data from data base:${error.status}`,
        message: {
          err:
            "Error occurred in userController.login. Check server logs for details.",
        },
      });
    });
};

userController.postMessage = (req, res, next) => {
  const { message, user_id } = req.body;

  query(queryTypes.INSERT_MESSAGE, [user_id, message]) // (message)
    .then((data) => {
      return next();
    })
    .catch((error) => {
      return next({
        log: `userController.postMessage:  Error posting tasks data from data base:${error.status}`,
        message: {
          err:
            "Error occurred in userController.postMessage. Check server logs for details.",
        },
      });
    });
};

userController.getMessages = (req, res, next) => {
  const { user_id } = req.body;

  query(queryTypes.GET_MESSAGES, [user_id]) // (user_id)
    .then((data) => {
      res.locals.data = data.rows;
      return next();
    })
    .catch((error) => {
      return next({
        log: `userController.getMessages:  Error posting tasks data from data base:${error.status}`,
        message: {
          err:
            "Error occurred in userController.getMessages. Check server logs for details.",
        },
      });
    });
};

module.exports = userController;
