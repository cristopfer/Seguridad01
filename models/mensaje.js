var pool = require('./conexion').pool;

function IngresarMensaje(idUsuario,idProfesor, mensaje, tipo, respuesta){ 
    pool.connect(function(err, client, done) {      
        client.query("SELECT * FROM ingresar_mensaje($1,$2,$3,$4)", [idUsuario,idProfesor,mensaje,tipo], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/comentario.js", "ingresar_mensaje", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function ConsultarMensajeProfesor(idUsuario,idProfesor,respuesta){ 
    pool.connect(function(err, client, done) { 
        client.query("SELECT * FROM consultar_mensaje_profesor($1,$2)", [idProfesor,idUsuario], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/comentario.js", "consultar_mensaje_profesor", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function ConsultarMensajePrivado(idProfesor,respuesta){ 
    pool.connect(function(err, client, done) { 
        client.query("SELECT * FROM consultar_mensaje_privado_profesor($1)", [idProfesor], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/comentario.js", "consultar_mensaje_privado_profesor", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

module.exports.IngresarMensaje = IngresarMensaje;
module.exports.ConsultarMensajeProfesor = ConsultarMensajeProfesor;
module.exports.ConsultarMensajePrivado = ConsultarMensajePrivado;