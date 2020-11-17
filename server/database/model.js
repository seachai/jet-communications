const { Pool } = require('pg'); 
require('dotenv').config();
const myURI = process.env.ELEPHANTPASSWORD;
const pool = new Pool({
    connectionString: myURI
});


module.exports = (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
};
