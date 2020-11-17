const { Pool } = require('pg'); 
require('dotenv').config();
const myURI = process.env.ELEPHANTPASSWORD;
const pool = new Pool({
    connectionString: myURI
});

console.log('myURI: ', myURI)

module.exports = (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
};

// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     login_at TIMESTAMP,
//     role TEXT,
//     given_name TEXT,
//     family_name TEXT,
//     username TEXT,
//     password TEXT,
//     conversation_id INTEGER
// );