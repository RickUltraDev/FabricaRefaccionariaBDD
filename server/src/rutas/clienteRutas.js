
const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');


//Regresa todos los clientes registrados
router.get("/api/clientes", async (req, res) => {
    var clientes = null;
      try {
        let QueryReal = "SELECT * FROM clientefabrica";
        dbpool.query(QueryReal, (err, resultados)=>{
          if(err){
              console.log(err);
              res.status(404).send({info: "Error"});
          }else{
              res.status(200).send({info: resultados.recordsets});              
          }
      })
      } catch (error) {
        console.log(error);
      }
});
  
  
//Registra un cliente 
router.post("/api/clientes/registro", async (req, res) => {
      
  let {razon_social, correo, calle, numero, cp, ciudad, estado, telefono} = req.body;
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
      
      let QueryReal = "INSERT INTO clientefabrica (razon_social, correo, calle, numero, cp, ciudad, estado, telefono, valido) VALUES ('"+razon_social
      +"','"+correo+"','"+calle+"',"+numero+","+cp+",'"+ciudad+"','"+estado+"',"+telefono+",1);";
      
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
  

//Dar de baja lógica a un cliente en especifico
router.delete("/api/clientes/elimina/:idCliente", async (req, res) => {
         
  //id a eliminar
  const { idCliente } =  req.params;
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

     let QueryReal = "UPDATE clientefabrica SET valido = 0 WHERE idCliente = "+idCliente+";";

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
                       res.status(400).send({info: "Eliminacion no realizada"});
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
                  res.status(200).send({info: "Eliminacion exitosa"});
                  //Success
                 } 
              })
          }//fin else
      })
    }})
});
  

//Actualiza los atributos que se quiera de un cliente
router.put("/api/clientes/actualiza/:idCliente", async (req, res) => {
           //id a eliminar
    const { idCliente } =  req.params;
    let {razon_social, correo, calle, numero, cp, ciudad, estado, telefono, valido} = req.body;
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
         
         let QueryReal = "UPDATE clientefabrica "+"SET razon_social = '"+
         razon_social+"', correo = '"+correo+"' , calle = '"+calle+"', numero = "+
         numero+" , cp = "+cp+", ciudad = '"+ciudad+"', estado = '"+estado+"', telefono = "+
         telefono+" , valido = "+valido+" WHERE idCliente  = "+idCliente+";";

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
                          res.status(400).send({info: "Actualizacion no realizada"});
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
                     res.status(200).send({info: "Actualizacion exitosa"});
                     //Success
                    } 
                 })
             }//fin else
         })
       }})
      
});



module.exports = router;