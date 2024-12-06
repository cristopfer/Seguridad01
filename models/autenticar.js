var pool = require('./conexion').pool;
var bcrypt = require('bcryptjs');
const saltRounds = 10;

function Autenticar(requerimiento, respuesta, direccion, path) {
    respuesta.render(direccion + path);
}

function IngresarSistemaUsuario(usuario, respuesta) {
    pool.connect(function (err, client, done) {
        client.query("SELECT password FROM usuario WHERE username = $1", [usuario.username], function (err, data) {
            done();
            if (err) {
                console.log(err);
            } else if (data.rows.length === 0) {
                respuesta.send(JSON.stringify({ estado: 0 })); // Usuario no encontrado
            } else {
                const hashedPassword = data.rows[0].password;
                bcrypt.compare(usuario.password, hashedPassword, function (err, result) {
                    if (result) {
                        respuesta.send(JSON.stringify({ estado: 1 })); // Login exitoso
                    } else {
                        respuesta.send(JSON.stringify({ estado: 0 })); // Contraseña incorrecta
                    }
                });
            }
        });
    });
}

function RegistrarUsuario(usuario, respuesta) {
    bcrypt.hash(usuario.password, saltRounds, function (err, hash) {
        if (err) {
            LogModel.ErrorLog("models/autenticar", "hash_password", err.message);
            respuesta.send(JSON.stringify({ estado: 0 }));
        } else {
            pool.connect(function (err, client, done) {
                client.query(
                    "SELECT * FROM registrar_usuario($1,$2,$3,$4,$5,$6,$7)",
                    [usuario.name, usuario.lastname, usuario.username, usuario.mail, hash, parseInt(usuario.tipo), usuario.codigo],
                    function (err, data) {
                        done();
                        if (err) {
                            LogModel.ErrorLog("models/autenticar", "registrar_usuario", err.message);
                        } else {
                            respuesta.send(JSON.stringify({ estado: data.rows[0].registrar_usuario }));
                        }
                    }
                );
            });
        }
    });
}

module.exports.Autenticar = Autenticar;
module.exports.IngresarSistemaUsuario = IngresarSistemaUsuario;
module.exports.RegistrarUsuario = RegistrarUsuario;