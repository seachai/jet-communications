const INSERT_USERS = `
  INSERT INTO users (role, given_name, family_name, username, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const CHECK_USER = `
SELECT * FROM users
WHERE username=$1 AND password=$2;
`;

const CREATE_CONVERSATION = `
INSERT INTO conversations (user_id, admin_id)
VALUES ($1, $2);
`;

const INSERT_MESSAGE = `
INSERT INTO messages (message)
VALUES ($1);
`;

module.exports = {
  INSERT_USERS,
  CREATE_CONVERSATION,
  INSERT_MESSAGE,
  CHECK_USER,
};
