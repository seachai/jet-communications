// 1. USER IS LOGGED IN
const INSERT_USERS = `
  INSERT INTO users (role, given_name, family_name, username, password, conversation_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

module.exports = {
  INSERT_USERS
};

