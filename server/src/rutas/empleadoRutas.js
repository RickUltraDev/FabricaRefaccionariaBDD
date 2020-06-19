const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //Modulo de token
const sql = require("mssql/msnodesqlv8");

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
    try {
      let QueryReal = "SELECT * FROM empleadofabrica";
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

//El registro de empleados
router.post("/api/empleados/registro",  (req, res) => {
  let {nombre, apellido_paterno, apellido_materno, fecha_nacimiento, calle, numero,
     cp, telefono, cargo, salario, correo, contrasena} = req.body;
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
      
      let QueryReal = "INSERT INTO empleadofabrica (nombre, apellido_paterno, apellido_materno, fecha_nacimiento,"+ 
      "calle, numero, cp, telefono, cargo, salario, correo, contrasena, valido) VALUES ('"+ 
      nombre+"','"+apellido_paterno+"','"+apellido_materno+"','"+fecha_nacimiento+"','"+calle+"',"+numero+","+cp+","+telefono+",'"+cargo+"',"+salario+",'"+correo+"','"+contrasena+"',1);";
      
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
  
//Dar de baja lógica a un respEmpleado
router.delete("/api/empleados/elimina/:idEmpleado", (req, res) => {
     //id a eliminar
  const { idEmpleado } =  req.params;
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

     let QueryReal = "UPDATE empleadofabrica SET valido = 0 WHERE idEmpleado = "+idEmpleado+";";

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
  

//Actualiza los atributos que se quiera de un respEmpleado
router.put("/api/empleados/actualiza/:idEmpleado", async (req, res) => {
               //id a eliminar
    const { idEmpleado } =  req.params;
    let {nombre, apellido_paterno, apellido_materno, fecha_nacimiento, calle, numero,
      cp, telefono, cargo, salario, correo, contrasena, valido} = req.body;
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
         
         let QueryReal = "UPDATE empleadofabrica SET nombre = '"+nombre+"', apellido_paterno = '"+apellido_paterno+"',"+ 
         "apellido_materno = '"+apellido_materno+"', fecha_nacimiento = '"+fecha_nacimiento+"',"+ 
         "calle = '"+calle+"', numero = "+numero+" , cp = "+cp+" , telefono = "+telefono+","+
         "cargo = '"+cargo+"', salario = "+salario+", correo = '"+correo+"', contrasena = '"+contrasena+"', valido = "+valido+
         " WHERE idEmpleado = "+idEmpleado+";";

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

//Actualiza la información del empleado para ser ascendido
router.put("/api/empleados/cargo/:idEmpleado", (req, res) => {
  //id a eliminar
const { idEmpleado } =  req.params;
const { cargo, salario } = req.body;
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

  let QueryReal = "UPDATE empleadofabrica SET cargo = '"+cargo+
  "', salario = '"+salario+"' WHERE idEmpleado = "+idEmpleado+";";

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
                    res.status(400).send({info: "Actualización no realizada"});
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
               res.status(200).send({info: "Actualización realizada"});
               //Success
              } 
           })
       }//fin else
   })
 }})  
   
});

//Consultar el salario promedio de los empleados de la fabrica
router.get("/api/empleados/salarioprom", async (req, res) => {
  var eMidEmpleados = null;
  try {
    let QueryReal = " SELECT Cast(Round((sum(salario) / count(*)),2,1) as decimal(18,2)) FROM empleadofabrica WHERE cargo = 'n'";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets[0]});              
      }
  })
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;