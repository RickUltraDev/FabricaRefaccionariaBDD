const sql = require("mssql/msnodesqlv8");
const util= require('util');

//Conexiones con sql-server
// función de agrupación de conexiones 
var pool= new sql.ConnectionPool({
  server: "DESKTOP-5H0CK2J\\SQLEXPRESS",
    database: "fabricarefaccionaria",
    driver: "msnodesqlv8",
    connectionLimit : 100,
    options: {
    trustedConnection: true,
    enableArithAbort: true
    }
});


/* Checar conexión*/
pool.connect(function(err){
  if (err){
      console.log("Error: "+ err);
  }else{
      console.log("BD conectada");
  }
});

pool.query = util.promisify(pool.query);

module.exports = pool;
