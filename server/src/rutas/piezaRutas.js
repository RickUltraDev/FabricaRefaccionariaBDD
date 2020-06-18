const express = require('express');
const router = express.Router();

/* Conexión con BD*/
var dbpool = require('../database');

  //Regresa todas la piezas validas registradas

router.get("/api/piezas", async (req, res) => {
    var piezas = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM piezasvalidas", function (
            err,
            results
          ) {
            piezas = results;
            if (piezas != null) {
              res.json({
                message: "Encontradas",
                JsonArray: piezas,
              });
            } else {
              res.json({
                message: "No Encontradas",
                JsonArray: piezas,
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
  

  //Registra una piezas valida
router.post("/api/piezas/registro", async (req, res) => {
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
  
            connection.query("INSERT INTO pieza set ?", [req.body], function (err, result) {
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

  //Dar de baja lógica a una pieza
 router.delete("/api/piezas/elimina/:idPieza", async (req, res) => {
         
        //id del cliente a eliminar
        const { idPieza } =  req.params;


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
  
            connection.query("UPDATE pieza SET valido = 0 WHERE idPieza = ?", idPieza , function (err, result) {
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
router.put("/api/piezas/actualiza/:idPieza", async (req, res) => {
         
        //id del cliente a eliminar
        const { idPieza } =  req.params;


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
  
            connection.query("UPDATE pieza SET ? WHERE idPieza = ?", [req.body,idPieza], function (err, result) {
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