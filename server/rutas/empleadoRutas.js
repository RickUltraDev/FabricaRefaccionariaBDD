const express = require('express');
const router = express.Router();

/* Conexión con BD*/
var dbpool = require('../database');

  //Regresa todos los empleados registrados validos
router.get("/api/empleados", async (req, res) => {
     var empleados = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM empleadosvalidos", function (
            err,
            results
          ) {
            empleados = results;
            if (empleados != null) {
              res.json({
                message: "Encontrados",
                JsonArray: empleados,
              });
            } else {
              res.json({
                message: "No Encontrados",
                JsonArray: empleados,
              });
            }

            //Cuando termine de hacer su tarea suelta la conexión
            connection.release();
          });
        });
      } catch (error) {
        console.log(error);
      }
    });


  //Login: Si coinciden el correo y contraseña crea la session
router.post("/api/empleados/login", async (req, res) => {
        var respEmpleado = null;
       try {
        dbpool.getConnection(function (err, connection) {
          
          let correo = req.body.correo;
          let pass = req.body.contrasena;
               
          dbpool.query("CALL empleadoLogin(?,?)",[correo, pass], function (err, results) {
            respEmpleado = results[0];
            if (results[0].length == 1) {
              //Guardar el valor que tenga el empleado en la sesion
             (req.session).empleado =  respEmpleado 
              res.status(200).send({
                   empleado:respEmpleado 
              });
              
            /// console.log("La sesion tiene en post: ",req.session);
            } else {

              res.status(404).send({
                empleado: null
              });
            }

            //Cuando termine de hacer su tarea suelta la conexión
            connection.release();
          });
        });
       } catch (error) {
        console.log(error);
       }
      
    });

 //Checar login
 router.get("/api/empleados/login", async (req, res) => {
    // console.log("La sesion tiene en get: ",(req.session as any).empleado );
    if(req.session){
      req.session.empleado ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false}); 
    }
    
  });





//El registro de empleados
router.post("/api/empleados/registro", async (req, res) => {
        dbpool.getConnection(function (err, connection) {

            
          /* Begin transaction */
          connection.beginTransaction(function (err) {
            if (err) {
              console.log("Error " + err);  
              connection.rollback(function() {
                  connection.release();
                  //Failure
              });
            }else{
  
            connection.query("INSERT INTO empleadofabrica set ?", [req.body], function (err, result) {
                if (err) {
                  console.log("Error " + err);
                  connection.rollback(function() {
                      connection.release();
                      //Failure
                  });
                }
               
                     
                connection.commit(function (err) {
                  if (err) {
                      console.log("Error " + err);
                      connection.rollback(function() {
                          connection.release();
                          //Failure
                      });
                  }else{
                      
                      connection.release();
                      res.json({ message: "Registro creado" });
                      //Success
                  }
  
                });
  
              }); //fin query
            }
  
          });//fin conexión
  
        });
      });
  
//Dar de baja lógica a un respEmpleado
router.delete("/api/empleados/elimina/:idEmpleado", async (req, res) => {
         
        //id del cliente a eliminar
        const { idEmpleado } =  req.params;


        dbpool.getConnection(function (err, connection) {
          /* Begin transaction */
          connection.beginTransaction(function (err) {
            if (err) {
              console.log("Error " + err);
              connection.rollback(function() {
                  connection.release();
                  //Failure
              });
            }else{
  
            connection.query("UPDATE empleadofabrica SET valido = 0 WHERE idEmpleado = ?", idEmpleado, function (err, result) {
                if (err) {
                  console.log("Error " + err);
                  connection.rollback(function() {
                      connection.release();
                      //Failure
                  });
                }
               
                     
                connection.commit(function (err) {
                  if (err) {
                    console.log("Error " + err);
                      connection.rollback(function() {
                          connection.release();
                          //Failure
                      });
                  }else{
                      connection.release();
                      res.json({ message: "Baja exitosa" });
                      //Success
                  }
  
                });
  
              }); //fin query
            }
  
          });//fin conexión
  
        });
      });
  

//Actualiza los atributos que se quiera de un respEmpleado
router.put("/api/empleados/actualiza/:idEmpleado", async (req, res) => {
         
        //id del cliente a eliminar
        const { idEmpleado } =  req.params;


        dbpool.getConnection(function (err, connection) {
          /* Begin transaction */
          connection.beginTransaction(function (err) {
            if (err) {
              console.log("Error " + err);
              connection.rollback(function() {
                  connection.release();
                  //Failure
              });
            }else{
  
            connection.query("UPDATE empleadofabrica SET ? WHERE idEmpleado = ?", [req.body,idEmpleado], function (err, result) {
                if (err) {
                  console.log("Error " + err);
                  connection.rollback(function() {
                      connection.release();
                      //Failure
                  });
                }
               
                     
                connection.commit(function (err) {
                  if (err) {
                    console.log("Error " + err);
                      connection.rollback(function() {
                          connection.release();
                          //Failure
                      });
                  }else{
                      connection.release();
                      res.json({ message: "Actualizado exitosamente" });
                      //Success
                  }
  
                });
  
              }); //fin query
            }
  
          });//fin conexión
  
        });
      });

module.exports = router;