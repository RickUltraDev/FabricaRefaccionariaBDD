const mysql = require('mysql');
//Conexiones con mysql
// función de agrupación de conexiones 
var pool = mysql.createPool({
    connectionLimit : 100, 
    host: 'localhost', //192.168.0.105 Aqui se cambia segun la IP
    user: 'root',
    password:'password',
    database: 'fabricarefaccionaria',
    port: 3306
}
);

/* Checar conexión*/
pool.getConnection(function(err, connection) {
if (err) {
  console.error('Error conectando: '+err.stack);
  return;
}
console.log('BD '+connection.state+' port '+connection.threadId);
//console.log(connection._pool._freeConnections.indexOf(connection));
});


module.exports = pool;
