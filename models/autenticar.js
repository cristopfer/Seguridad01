var pool = require('./conexion').pool;

function Autenticar(requerimiento, respuesta, direccion, path){
    respuesta.render(direccion + path);
}

function IngresarSistemaUsuario(usuario, respuesta){
	pool.connect(function(err, client, done){		
		client.query("SELECT * FROM ingresar_sistema($1,$2)", [usuario.username,usuario.password],function(err,data) {        
        	done();				
			if(err){ 	 
        		LogModel.ErrorLog("models/autenticar", "ingresar_sistema", err.message);                
        	}  
        	else{ 		
            	respuesta.send(JSON.stringify({ estado: data.rows[0].ingresar_sistema })); 
        	}   
    	});
	});    
}

function RegistrarUsuario(usuario, respuesta){
	pool.connect(function(err, client, done){
		client.query("SELECT * FROM registrar_usuario($1,$2,$3,$4,$5,$6,$7)", [usuario.name,usuario.lastname,usuario.username,usuario.mail,usuario.password,parseInt(usuario.tipo),usuario.codigo],function(err,data) {        
        	done();				
			if(err){ 	 
        		LogModel.ErrorLog("models/autenticar", "registrar_usuario", err.message);                
        	}  
        	else{ 		
            	respuesta.send(JSON.stringify({ estado: data.rows[0].registrar_usuario })); 
        	}   
    	});
	});    
}

module.exports.Autenticar = Autenticar;
module.exports.IngresarSistemaUsuario = IngresarSistemaUsuario;
module.exports.RegistrarUsuario = RegistrarUsuario;