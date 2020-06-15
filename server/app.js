/*Imports necesarios*/
const mysql = require("mysql");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const router = express.Router();

/* Middleware*/
/* Configuraciones*/
var app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev")); //Este middleware sirve para ver el estatus de los req

app.use(
  cors({
    origin: [
      //Cross origin resourse sharing esto es para compartir información entre difs. dominios
      "http://localhost:4200",
    ],
    credentials: false,
  })
);

app.use(express.json()); //Es para se convertir los body.req a json, tambien podría ser usado body-parse.json
app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
  })
); //Es para el manejo de sessiones con secretos en las cookies

/* Conexiones de prueba*/
app.get("/", async (req, res) => {
  res.json({ Mensaje: "Bienvenido" });
});

app.get("/pruebas/session", async (req, res) => {
                 
    //Primero hay que comprobar si la session existe, si es que existe y no es 
     // undefined se puede generar todo lo demás
    if(req.session){
       if(req.session.page_views){
        req.session.page_views++;
        // tambien se puede castear para un objeto de tipo any así (req.session as any).page_views; 
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;          
        res.send("Welcome to this page for the first time!");
      }
    }
   });

/* Rutas para las conexiones */

app.use(require("./rutas/clienteRutas"));
app.use(require("./rutas/empleadoRutas"));
app.use(require("./rutas/piezaRutas"));
app.use(require("./rutas/pedidoRutas"));
app.use(require("./rutas/envioRutas"));
app.use(require("./rutas/pagoRutas"));
app.use(require("./rutas/facturaRutas"));

/* Inciar la conexión con el server*/
app.set("port", 3000 | process.env.connection);

app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto: " + app.get("port"));
});
