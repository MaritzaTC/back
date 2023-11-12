let mysql = require('mysql');


let conexion = mysql.createConnection({
    host: 'localhost',
    database: "formula1",
    user: 'root',
    password: ''
});

conexion.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión correcta");
    }
}); 