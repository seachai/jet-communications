const { receiveMessageOnPort } = require("worker_threads");
const query = require("../database/model.js");
const queryTypes = require("../database/queryTypes.js");
const userController = {};

userController.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  query(queryTypes.CHECK_USERNAME, [name])
    .then((data) => {
      // CHECK IF SIMILAR USERNAME EXISTS IN THE DATABASE
      // IF USERNAME IS FREE - MAKE A QUERY TO SAVE IT IN THE DB
      if (!data.fields[0]) {
        // console.log("data from CHECK_USERNAME function", data);
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
            return next({
              log: `userController.signUp:  Error posting tasks data from data base:${error.status}`,
              message: {
                err:
                  "Error occurred in userController.signUp. Check server logs for details.",
              },
            });
          });
      }
      // IF USERNAME IS BUSY - SEND THIS INFORMATION TO THE FRONTEND
      else {
        res.locals.user = "please try another username";
      }
    })

    .catch((error) => {
      return next({
        log: `userController.signUp:  Error checking whether username exists in database:${error.status}`,
        message: {
          err:
            "Error occurred in userController.signUp . Check server logs for details.",
        },
      });
    });
};

userController.login = (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;

  query(queryTypes.CHECK_USER, [username, password]) // (username, password)
    .then((data) => {
      res.locals.data = data.rows[0];
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
