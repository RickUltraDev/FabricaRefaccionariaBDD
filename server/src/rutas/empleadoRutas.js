const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //Modulo de token

/* Conexión con BD*/
var dbpool = require('../database');


//*Creación del token*/



 //-----------------------------------FUNCION DE LOGIN----------------------------------
  
 //Función para verificación del token creado en login.
 function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send({
      token: null
    });
  }

  const token = req.headers.authorization.split(' ')[1];
    if (token == 'null'){
       //No autorizado para seguir
      return res.status(401).send({
        token: null
      });
    }

    //Aqui se verifica el token y se saca la información que tiene (payload)
    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload.id;
    next();
    
 }



  //Login: Si coinciden el correo y contraseña crea la session
router.post("/api/empleados/login", async (req, res) => {
        var respEmpleado = null;
       try {
        dbpool.getConnection(function (err, connection) {
          
          let correo = req.body.correo;
          let pass = req.body.contrasena;
               
          dbpool.query("CALL empleadoLogin(?,?)",[correo, pass], function (err, results) {
            respEmpleado = results[0][0]; //En la posción del JSON
            if (results[0].length == 1) {
              //Guardar el valor que tenga el id del empleado en un token
              //Idempleado, secret, tiempo de vida token
              //let test = results[0];
              
              const token = jwt.sign({id:respEmpleado.idEmpleado}, 'secretkey', { expiresIn: '2h' });
              
             
              //Un Json de token que contenga el token creado
              res.status(200).send({
                   token: token
              });
              
            /// console.log("La sesion tiene en post: ",req.session);
            } else {

               res.status(404).send({
                token: null
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

//rutas de prueba

router.get("/api/empleados/paquetes", verifyToken, async (req, res) => {
  



});






  //-----------------------------------FUNCIONES BÁSICAS DEL API----------------------------------

  //Regresa todos los empleados registrados validos
  router.get("/api/empleados", async (req, res) => {
    var empleados = null;
     try {
       dbpool.getConnection(function (err, connection) {
         dbpool.query("SELECT * FROM empleadosvalidos",   function (
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

//El registro de empleados
router.post("/api/empleados/registro",  (req, res) => {
        dbpool.getConnection(function (err, connection) {

            
          /* Begin transaction */
          connection.beginTransaction(function (err) {
            if (err) {
              console.log("Error " + err);  
              connection.rollback(function() {
                  connection.release();
                  //Failure
              });
              res.json({ message: "Registro creado" });
            }else{
  
            connection.query("INSERT INTO empleadofabrica set ?", [req.body],  function (err, result) {
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
router.delete("/api/empleados/elimina/:idEmpleado", (req, res) => {
         
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
  
            connection.query("UPDATE empleadofabrica SET valido = 0 WHERE idEmpleado = ?", idEmpleado,   function (err, result) {
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
  
            connection.query("UPDATE empleadofabrica SET ? WHERE idEmpleado = ?", [req.body,idEmpleado],  function (err, result) {
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