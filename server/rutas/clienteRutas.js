
const express = require('express');
const router = express.Router();

/* Conexión con BD*/
var dbpool = require('../database');


  //Regresa todos los clientes registrados

   router.get("/api/clientes", async (req, res) => {
    var clientes = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM clientesvalidos", function (
            err,
            results
          ) {
            clientes = results;
            if (clientes != null) {
              res.json({
                message: "Encontrados",
                JsonArray: clientes,
              });
            } else {
              res.json({
                message: "No Encontrados",
                JsonArray: clientes,
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
  
  
  //Registra un cliente 
router.post("/api/clientes/registro", async (req, res) => {
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

          connection.query("INSERT INTO clientefabrica set ?", [req.body], function (err, result) {
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
  

  //Dar de baja lógica a un cliente en especifico
router.delete("/api/clientes/elimina/:idCliente", async (req, res) => {
         
        //id del cliente a eliminar
        const { idCliente } =  req.params;

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
  
            connection.query("UPDATE clientefabrica SET valido = 0 WHERE idCliente = ?", idCliente, function (err, result) {
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
                      res.json({ message: "Cliente dado de baja" });
                      //Success
                  }
  
                });
  
              }); //fin query
            }
  
          });//fin conexión
  
        });
      });
  

  //Actualiza los atributos que se quiera de un cliente

router.put("/api/clientes/actualiza/:idCliente", async (req, res) => {
         
        //id del cliente a eliminar
        const { idCliente } =  req.params;


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
  
            connection.query("UPDATE clientefabrica SET ? WHERE idCliente = ?", [req.body,idCliente], function (err, result) {
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
                      res.json({ message: "Cliente actualizado exitosamente" });
                      //Success
                  }
  
                });
  
              }); //fin query
            }
  
          });//fin conexión
  
        });
      });

module.exports = router;