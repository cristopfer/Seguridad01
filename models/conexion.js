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
    database: 'db_servicio_4khl',
    password: 'YmvkwtJkufMBgQpc3FIC7bmahaBj0841',
    host: 'dpg-crqe08tsvqrc73ctjdgg-a.oregon-postgres.render.com',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
};
var pool = new Pool(config);
//const pool = await poolPromise;

module.exports.pool = pool;