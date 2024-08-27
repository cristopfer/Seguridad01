var Pool = require('pg-pool');
//var poolPromise  = require('pg-pool').poolPromise;
/*var config = {
    user: 'postgres',
    database: 'Proyecto-SCSE',
    password: 'corona',
    host: 'localhost',
    port: 5432
};*/
var config = {
    user: 'pgscse_user',
    database: 'pgscse',
    password: 'vkP0DchOI6a50Se6UrWd67jf7h9MggjP',
    host: 'dpg-cibnjjh5rnuk9q9sfqdg-a.oregon-postgres.render.com',
    port: 5432,
    ssl: true
};
var pool = new Pool(config);
//const pool = await poolPromise;

module.exports.pool = pool;