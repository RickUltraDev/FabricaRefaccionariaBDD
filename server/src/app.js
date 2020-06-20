/*Imports necesarios*/

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = express.Router();


/* Middleware*/
/* Configuraciones*/
var app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev")); //Este middleware sirve para ver el estatus de los req

 //Cross origin resourse sharing esto es para compartir información entre difs. dominios
app.use(cors({origin: ["http://localhost:4200",],credentials: true}));

app.use(express.json()); //Es para se convertir los body.req a json, tambien podría ser usado body-parse.json
app.use(express.urlencoded({ extended: false }));


/* Conexiones de prueba*/
app.get("/", async (req, res) => {
  res.json({ Mensaje: "Bienvenido" });
});


/* Rutas para las conexiones */
app.use(require("./rutas/clienteRutas"));
app.use(require("./rutas/empleadoRutas"));
app.use(require("./rutas/envioRutas"));
app.use(require("./rutas/piezaRutas"));
app.use(require("./rutas/facturaRutas"));
app.use(require("./rutas/pagoRutas"));
app.use(require("./rutas/pedidoRutas"));

/* Inciar la conexión con el server*/
app.set("port", 3000 | process.env.connection);

app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto: " + app.get("port"));
});
