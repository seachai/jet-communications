// const INSERT_USERS = `
//   INSERT INTO users (role, given_name, family_name, username, password)
//   VALUES ($1, $2, $3, $4, $5)
//   ON CONFLICT ON CONSTRAINT unique_username
//   DO NOTHING
// `;

const INSERT_USERS = `
  INSERT INTO users (role, given_name, family_name, username, password)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const CHECK_USER = `
SELECT * FROM users
WHERE username=$1 AND password=$2;
`;

const CHECK_USERNAME = `
SELECT * FROM users
WHERE username=$1;
`;

const INSERT_MESSAGE = `
INSERT INTO messages (user_id, message)
VALUES ($1, $2);
`;

const GET_MESSAGES = `
SELECT * FROM messages
WHERE user_id=$1;
`;

module.exports = {
  INSERT_USERS,
  INSERT_MESSAGE,
  CHECK_USER,
  GET_MESSAGES,
  CHECK_USERNAME,
};
