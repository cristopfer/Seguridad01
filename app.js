var fs = require('fs');
var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var path = require("path"); 
var engines = require('consolidate');
var mustache = require('mustache');
var multer  = require('multer');

var AutenticarModel = require("./models/autenticar");
var UsuarioModel = require("./models/usuario");
var ProfesorModel = require("./models/profesor");
var ComentarioModel = require("./models/comentario");
var MensajeModel = require("./models/mensaje");
var PagoModel = require("./models/pago");
global.nombreusuario = "-";
global.idpro = "-";
global.idusu = '-';
global.idproLogueado = '-';

var app = express();
var port = process.env.PORT || 8080;
var host = process.env.IP || '0.0.0.0';
var srcpath = path.join(__dirname,'/views');

//app.use(express.static('views'));
app.use(express.static(__dirname+'/views'));
app.use(session({secret:'XASDASDA', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', engines.mustache);
app.set("view engine", "html");

app.get("/",function(req,res){ 
	AutenticarModel.Autenticar(req, res, srcpath, '/SCSE-Login.html');		
});
app.post("/ingresarSistemaUsuario",function(req,res){ 	
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    nombreusuario = req.body.username;   
    AutenticarModel.IngresarSistemaUsuario(req.body, res);   
});
app.post("/registrarSistemaUsuario",function(req,res){ 	
    req.session.name = req.body.username;
    req.session.lastname = req.body.password;
    req.session.mail = req.body.mail;
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    req.session.tipo = req.body.tipo;
    req.session.codigo = req.body.codigo;
    AutenticarModel.RegistrarUsuario(req.body, res);   
});
app.post("/usuarioLogueado",function(req,res){    
    UsuarioModel.DatosUsuario(nombreusuario,res);
});
app.post("/listadoCursosProfesor",function(req,res){ 
    ProfesorModel.ListadoCursos(req.body.curso,res);
});
app.post("/consultarProfesor",function(req,res){ 
    ProfesorModel.ConsultarProfesor(idpro,res);
});
app.post("/obtenerIdProfesor",function(req,res){ 
    idpro = req.body.idprofesor;
    res.send(JSON.stringify({ estado: 0 }));
});
app.post("/calificar",function(req,res){ 
    ProfesorModel.CalificarProfesor(idpro,req.body.puntos,res);
});
app.post("/comentar",function(req,res){ 
    ComentarioModel.IngresarComentario(idusu,idpro,req.body.comentario,res);
});
app.post("/listadoComentarioProfesor",function(req,res){ 
    ComentarioModel.ListaComentarioProfesor(idpro,res);
});
app.post("/mensaje",function(req,res){ 
    MensajeModel.IngresarMensaje(idusu,idpro,req.body.mensaje,req.body.tipo,res);
});
app.post("/consultarProfesorLogueado",function(req,res){ 
    ProfesorModel.ConsultarProfesor(idproLogueado,res);
});
app.post("/actualizarDatosProfesor",function(req,res){ 
    ProfesorModel.ActualizarProfesor(idusu,req.body.nombre,req.body.apellido,req.body.correo,res);
});
app.post("/actualizarCurso",function(req,res){ 
    ProfesorModel.ActualizarCurso(idproLogueado,req.body.curso,req.body.descripcion,res);
});
app.post("/listadoMensajesProfesor",function(req,res){ 
    MensajeModel.ConsultarMensajeProfesor(idusu,idpro,res);
});
app.post("/pagarServicio",function(req,res){ 
    PagoModel.PagarProfesor(idusu,idpro,req.body.tarjeta,req.body.correo,res);
});
app.post("/verMensajesPrivados",function(req,res){ 
    console.log(idproLogueado);
    MensajeModel.ConsultarMensajePrivado(idproLogueado,res);
});
app.post("/mensajePrivadoProfesor",function(req,res){
    MensajeModel.IngresarMensaje(req.body.idusu,idproLogueado,req.body.mensaje,req.body.tipo,res);
});

app.listen(port, host ,function(){   
    console.log("server start on port"+ port);  
});