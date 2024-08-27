var pool = require('./conexion').pool;

function PagarProfesor(idUsuario,idProfesor, tarjeta, correo, respuesta){ 
    pool.connect(function(err, client, done) {        
        client.query("SELECT * FROM pagar_profesor($1,$2,$3,$4)", [idUsuario,idProfesor,tarjeta,correo], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/profesor.js", "pagar_profesor", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

module.exports.PagarProfesor = PagarProfesor;