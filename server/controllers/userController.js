const query = require("../database/model.js");
const queryTypes = require("../database/queryTypes.js");
const userController = {};

userController.signUp = (req, res, next) => {
    console.log("inside userController.signUp");
    const { name, email, password } = req.body;
    console.log("name: ", name)
    console.log("email: ", email)
    console.log("password: ", password)
    query(queryTypes.INSERT_USERS,['admin', name, 'Abdukhamidov', email, password])   // (role, given_name, family_name, username, password)
    .then(data => {
        console.log(res.locals.data)
        return next()
      })
      .catch(error => {
        return next({
          log: `userController.signUp:  Error posting tasks data from data base:${error.status}`,
          message: { err: 'Error occurred in userController.signUp. Check server logs for details.'},
        })
      })
}

// userController.login = (req, res, next) => {
//   const { email, password } = req.body;

//   query(
//     queryTypes.
//   )
// }
  

module.exports = userController;
// DATABASE CHECK
// 1. USER INFO IS SAVED - OK

//2. MESSAGE INFO IS SAVED
  // 2.0 retrieve right user_id and admin_id from DB based on username information
  // 2.1 CONVERSATION IS CREATED PROPERLY - OK
  // const convCreate = () => {
  //   query(
  //     queryTypes.CREATE_CONVERSATION,
  //     ['TEST', 'TEST'],   // (user_id, admin_id)
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
  //   const saveMessage = () => {
  //   query(
  //     queryTypes.INSERT_MESSAGE,
  //     ['TEST'],   // (message, username)
  //     (err, res) => {
  //       if (err) {
  //         console.log(`Error in INSERT_MESSAGE. Error: ${err}`);
  //       } else {
  //         // console.log("** INSERT_MESSAGE returned: **", res);
  //       }
  //     }
  //   );
  // }
  // saveMessage()