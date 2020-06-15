const express = require('express');
const router = express.Router();

/* Conexión con BD*/
var dbpool = require('../database');

//Regresa todas las facturas validas registradas
router.get("/api/facturas", async (req, res) => {
    var facturas = null;
      try {
        dbpool.getConnection(function (err, connection) {
          dbpool.query("SELECT * FROM facturasvalidas", function (
            err,
            results
          ) {
            facturas = results;
            if (facturas != null) {
              res.json({
                message: "Encontradas",
                JsonArray: facturas,
              });
            } else {
              res.json({
                message: "No Encontradas",
                JsonArray: facturas,
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


  //Registra una factura valida
router.post("/api/facturas/registro", async (req, res) => {
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
  
            connection.query("INSERT INTO facturafabrica set ?", [req.body], function (err, result) {
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


  //Actualizar una factura
router.put("/api/facturas/actualiza/:idFactura", async (req, res) => {
         
        //id del cliente a eliminar
        const { idFactura } =  req.params;

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
  
            connection.query("UPDATE facturafabrica SET ? WHERE idFactura = ?", [req.body,idFactura], function (err, result) {
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