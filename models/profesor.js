var pool = require('./conexion').pool;

function ListadoCursos(curso, respuesta){ 
    pool.connect(function(err, client, done) {
        client.query("SELECT * FROM consultar_cursos($1)", [curso], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/profesor.js", "consultar_cursos", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function ConsultarProfesor(idProfesor, respuesta){ 
    pool.connect(function(err, client, done) {
        client.query("SELECT * FROM consultar_profesor($1)", [idProfesor], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/profesor.js", "consultar_cursos", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function CalificarProfesor(idProfesor, puntos, respuesta){ 
    pool.connect(function(err, client, done) {        
        client.query("SELECT * FROM calificar_profesor($1,$2)", [idProfesor,puntos], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/profesor.js", "consultar_cursos", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function ActualizarProfesor(idUsuario,nombre,apellido,correo, respuesta){ 
    pool.connect(function(err, client, done) {
        client.query("SELECT * FROM actualizar_datos_profesor($1,$2,$3,$4)", [idUsuario,nombre,apellido,correo], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/profesor.js", "actualizar_datos_profesor", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

function ActualizarCurso(idProfesor,curso,descripcion, respuesta){ 
    pool.connect(function(err, client, done) {
        client.query("SELECT * FROM actualizar_curso_profesor($1,$2,$3)", [idProfesor,curso,descripcion], function(err,data) {
            done(); 
            if(err){
                LogModel.ErrorLog("models/profesor.js", "actualizar_curso_profesor", err.message);
            }
            else{
                respuesta.send(data.rows);
            }              
        });
    }); 
}

module.exports.ListadoCursos = ListadoCursos;
module.exports.ConsultarProfesor = ConsultarProfesor;
module.exports.CalificarProfesor = CalificarProfesor;
module.exports.ActualizarProfesor = ActualizarProfesor;
module.exports.ActualizarCurso = ActualizarCurso;