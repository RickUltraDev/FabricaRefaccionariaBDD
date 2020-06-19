const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');

//Regresa todas las facturas validas registradas
router.get("/api/facturas", async (req, res) => {
  var facturas = null;
  try {
    let QueryReal = "SELECT * FROM facturafabrica";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});
          //console.log(resultados.recordsets[0][0].idPieza);              
      }
  })
  } catch (error) {
    console.log(error);
  }
});


  //Registra una factura valida
router.post("/api/facturas/registro", async (req, res) => {
  let {fecha, total, idPedido, idEmpleado} = req.body;
  const transaction = new sql.Transaction(dbpool)
  
  transaction.begin(err => {
       if(err){
        console.log("Error: "+err);
        throw err;
         //Failed
       }else{
      let rolledBack = false
   
      transaction.on('rollback', aborted => {
          // emited with aborted === true
          rolledBack = true
      })
      
      let QueryReal = "INSERT INTO facturafabrica (fecha, total, idPedido, idEmpleado ) VALUES "+
      "('"+fecha+"',"+total+","+idPedido+","+idEmpleado+");";
      
      new sql.Request(transaction).query(QueryReal, (err,datos) => {
          // insert should fail because of invalid value
          if (err) {
            console.log("Error: "+err);
              if (!rolledBack) {
                  transaction.rollback(err => {
                     if(err){
                      console.log("Error: "+err);
                      throw err;    
                      //Failed
                     }else{
                       res.status(400).send({info: "Registro no realizado"});
                     }
                  })
              }
          } else {
              transaction.commit(err => {
                if(err){
                  console.log("Error: "+err);
                  throw err;
                  //Failed
                 }else{
                  res.status(200).send({info: "Registro exitoso"});
                  //Success
                 } 
              })
          }//fin else
      })
    }})  
});

//Regresa una factura hecha para cierto pedido
router.get("/api/facturas/:idPedido", async (req, res) => {
  const { idPedido } = req.params;
  try {
    let QueryReal = "SELECT * FROM facturafabrica WHERE idPedido = "+idPedido;
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets[0][0]});          
      }
  })
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;