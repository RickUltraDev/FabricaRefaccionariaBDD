const express = require('express');
const router = express.Router();

/* Conexión con BD*/
var dbpool = require('../database');

 //Regresa todas la pagos validos registrados
router.get("/api/pagos", async (req, res) => {
        var pagos = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM pagosvalidos", function (
            err,
            results
          ) {
            pagos = results;
            if (pagos != null) {
              res.json({
                message: "Encontrados",
                JsonArray: pagos,
              });
            } else {
              res.json({
                message: "No Encontrados",
                JsonArray: pagos,
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


  //Registra una pago valido
router.post("/api/pagos/registro", async (req, res) => {
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
  
            connection.query("INSERT INTO pago set ?", [req.body], function (err, result) {
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

  //Actualizar un pago
 router.put("/api/pagos/actualiza/:idPago", async (req, res) => {
         
        //id del cliente a eliminar
        const { idPago } =  req.params;


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
  
            connection.query("UPDATE pago SET ? WHERE idPago = ?", [req.body,idPago], function (err, result) {
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