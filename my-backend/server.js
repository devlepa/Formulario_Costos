const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../my-frontend/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../my-frontend/public", "index.html"));
});

app.post('/submit', (req, res) => {
    const cantidadEquipo = req.body.cantidadEquipo;
    const equiposSonido = req.body.equiposSonido;
    const valorAlquiler = req.body.valorAlquiler;
    const requiereDecoracion = req.body.requiereDecoracion;
    const requiereSeguridad = req.body.requiereSeguridad;
    const requiereTransporte = req.body.requiereTransporte;
    const requiereCocina = req.body.requiereCocina;

    console.log(`Cantidad de equipo: ${cantidadEquipo}`);
    console.log(`Equipos de sonido seleccionados: ${Array.isArray(equiposSonido) ? equiposSonido.join(', ') : equiposSonido}`);
    console.log(`Valor de alquiler: ${valorAlquiler}`);
    console.log(`Requiere decoración: ${requiereDecoracion}`);
    console.log(`Requiere Seguridad: ${requiereSeguridad}`);
    console.log(`Requiere Transporte: ${requiereTransporte}`);
    console.log(`Requiere Cocina: ${requiereCocina}`);

    res.send('Formulario recibido y datos procesados');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
