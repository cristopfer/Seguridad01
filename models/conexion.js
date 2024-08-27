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
    user: 'cris',
    database: 'db_servicio_vkar',
    password: 'aCAwjGFnPdjmIIVKcHESL9oufzoiuHri',
    host: 'dpg-cr6javaj1k6c73d593fg-a.oregon-postgres.render.com',
    port: 5432,
    ssl: true
};
var pool = new Pool(config);
//const pool = await poolPromise;

module.exports.pool = pool;