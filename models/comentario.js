var pool = require('./conexion').pool;

function IngresarComentario(idUsuario,idProfesor, comentario, respuesta){ 
    pool.connect(function(err, client, done) {        
        client.query("SELECT * FROM ingresar_comentario($1,$2,$3)", [idUsuario,idProfesor,comentario], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/comentario.js", "ingresar_comentario", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function ListaComentarioProfesor(idProfesor, respuesta){ 
    pool.connect(function(err, client, done) {        
        client.query("SELECT * FROM consultar_comentarios_profesor($1)", [idProfesor], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/comentario.js", "consultar_comentarios_profesor", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

module.exports.IngresarComentario = IngresarComentario;
module.exports.ListaComentarioProfesor = ListaComentarioProfesor;