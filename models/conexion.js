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
    database: 'seguridad_db',
    password: 'LFValkhBPJPGyqzNxXYKY976l1c0Tjnk',
    host: 'dpg-ct8tdsu8ii6s73cg8rv0-a.oregon-postgres.render.com',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
};
var pool = new Pool(config);
//const pool = await poolPromise;

module.exports.pool = pool;