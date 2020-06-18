const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //Modulo de token

/* Conexión con BD*/
var dbpool = require('../database');

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




 //Regresa todas la pedidos validas registradas
router.get("/api/pedidos", verifyToken, async (req, res) => {
    var pedidos = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM pedidosvalidos", function (
            err,
            results
          ) {
            pedidos = results;
            if (pedidos != null) {
              res.json({
                message: "Encontrados",
                JsonArray: pedidos,
              });
            } else {
              res.json({
                message: "No Encontrados",
                JsonArray: pedidos,
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
  
  
  //Regresa todos los pedidos con sus detalles básicos
router.get("/api/pedidosdetallados", async (req, res) => {
        var pedidos = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM pedidosrealizadosvalidos", function (
            err,
            results
          ) {
            pedidos = results;
            if (pedidos != null) {
              res.json({
                message: "Encontrados",
                JsonArray: pedidos,
              });
            } else {
              res.json({
                message: "No Encontrados",
                JsonArray: pedidos,
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

  //Registra una pedidos valida
router.post("/api/pedidos/registro", async (req, res) => {
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

          connection.query("INSERT INTO pedidofabrica set ?", [req.body], function (err, result) {
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

  
  //Guarda uno o varios detalles de cada pedido
 router.post("/api/detallepedidos/registro", async (req, res) => {
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
           
          //Idpedido, idpieza, cantidad
          connection.query("INSERT INTO detallepedidopieza set ?", [req.body], function (err, result) {
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

  //Dar de baja una pedido
 router.delete("/api/pedidos/elimina/:idPedido", async (req, res) => {
         
      //id del cliente a eliminar
      const { idPedido } =  req.params;


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

          connection.query("UPDATE pedidofabrica SET valido = 0 WHERE idPedido = ?", idPedido , function (err, result) {
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

  //Actualiza una pedido
 router.put("/api/pedidos/actualiza/:idPedido", async (req, res) => {
         
      //id del cliente a eliminar
      const { idPedido } =  req.params;


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

          connection.query("UPDATE pedidofabrica SET ? WHERE idPedido = ?", [req.body,idPedido], function (err, result) {
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