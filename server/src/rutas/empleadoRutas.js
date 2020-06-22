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
    //return res.status(401).send({token: null});
    return res.status(401).send('No autorizado');
  }
 
  //Comprobar que se tenga el token, antes del token se usa la palabra Bearer
  const token = req.headers.authorization.split(' ')[1];
    if (token == 'null'){
       //No autorizado para seguir
      //return res.status(401).send({token: null});
      return res.status(401).send('No autorizado');
    }

    //Aqui se verifica el token y se saca la información que tiene (payload)
    const payload = jwt.verify(token, 'secretkey');
    //En req se creará una propiedad de req que tenga el usuario logeado
    req.user = payload.user;
    
    next();
    
 }



  //Login: Si coinciden el correo y contraseña crea la session
router.post("/api/empleados/login", async (req, res) => {
  let { correo, contrasena } = req.body;
  const transaction = new sql.Transaction(dbpool)
  let respEmpleado = null;

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
      
      let QueryReal = "exec empleado_login '"+correo+"','"+contrasena+"';";
      
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
                  
                  if (datos.recordsets[0].length == 1) {
                    respEmpleado = datos.recordsets[0][0];
                    //expiresIn: '2h'
                    const token = jwt.sign({user:respEmpleado}, 'secretkey', {});               
                    res.status(200).send({token: token, user: respEmpleado});
                  }else{
                    res.status(404).send({token: null});
                  }  
                  //Success
                 } 
              })
          }//fin else
      })
    }})   
});

//Regresa los datos del usuario si esta logueado
router.get("/api/empleados/perfil", verifyToken, async (req, res) => {

  //Aqui se podría poner un select * from empleados que busque el id de la req.id y te regrese los datos de usuario
  res.status(200).send({info: req.user});  
  
});


//rutas de prueba
router.get("/api/empleados/paquetes", verifyToken, async (req, res) => {

  res.status(200).send({info:"alguna info" });  
});


//-----------------------------------FUNCIONES BÁSICAS DEL API----------------------------------

//Regresa todos los empleados registrados validos
router.get("/api/empleados",  verifyToken, async (req, res) => {
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
router.post("/api/empleados/registro",  verifyToken,  (req, res) => {
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
router.delete("/api/empleados/elimina/:idEmpleado", verifyToken, (req, res) => {
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
router.put("/api/empleados/actualiza/:idEmpleado", verifyToken, async (req, res) => {

    const { idEmpleado } =  req.params;
    let {nombre, apellido_paterno, apellido_materno, fecha_nacimiento, calle, numero,
      cp, telefono, cargo, salario, correo, contrasena, valido} = req.body;
    const transaction = new sql.Transaction(dbpool)

    console.log(req.body);
    console.log(req.params);
    
     
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

//Busqueda de un empleado
router.post("/api/empleados/busqueda",  (req, res) => {
  let {nombre, apellido_paterno, apellido_materno, cargo} = req.body;

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
      
            
      let QueryReal = "SELECT * FROM empleadofabrica"+
      " WHERE cargo = '"+cargo+"' AND nombre LIKE '%"+nombre+"%' OR apellido_materno LIKE '"+apellido_materno+
      "%' OR apellido_paterno LIKE '"+apellido_paterno+"%';";
      
      new sql.Request(transaction).query(QueryReal, (err,resultados) => {
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
                

                  if(resultados.recordsets[0] == 0){
                    res.status(404).send({info: null});
                    
                  }else{
                    res.status(200).send({info: resultados.recordsets});
                    
                  }
                  
                  //Success
                 } 
              })
          }//fin else
      })
    }})

  
});


module.exports = router;