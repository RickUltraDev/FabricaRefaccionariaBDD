const express = require('express');
const router = express.Router();

/* Conexión con BD*/
var dbpool = require('../database');

 
//Regresa todas los envio validos registradas
router.get("/api/envios", async (req, res) => {
    var envios = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM enviosvalidos", function (
            err,
            results
          ) {
            envios = results;
            if (envios != null) {
              res.json({
                message: "Encontrados",
                JsonArray: envios,
              });
            } else {
              res.json({
                message: "No Encontrados",
                JsonArray: envios,
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
  

  //Registra un envio valido
router.post("/api/envios/registro", async (req, res) => {
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
  
            connection.query("INSERT INTO envio set ?", [req.body], function (err, result) {
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


  //Dar de baja un envio
 router.delete("/api/envios/elimina/:idEnvio", async (req, res) => {
         
        //id del cliente a eliminar
        const { idEnvio } =  req.params;


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
  
            connection.query("UPDATE envio SET valido = 0 WHERE idEnvio = ?", idEnvio , function (err, result) {
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


  //Actualizar una pieza
router.put("/api/envios/actualiza/:idEnvio", async (req, res) => {
         
        //id del cliente a eliminar
        const { idEnvio } =  req.params;


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
  
            connection.query("UPDATE envio SET ? WHERE idEnvio = ?", [req.body,idEnvio], function (err, result) {
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