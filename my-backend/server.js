const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const connection = require('./config/db');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../my-frontend/public")));

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

app.get("/eventos", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-frontend/public", "delete.html"));
});

app.delete('/eventos/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM eventos WHERE id = ?`;
  const values = [id];

  connection.query(sql, values, (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).json({ message: 'Error al eliminar el evento: ' + error.message });
      } else {
          if (results.affectedRows === 0) {
              res.status(404).json({ message: 'Evento no encontrado' });
          } else {
              res.json({ message: 'Evento eliminado correctamente' });
          }
      }
  });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../my-frontend/public", "index.html"));
    res.render('index', {data:null})
});

const costosServicios = {
  equipo: 30000,
  decoracion: 1000,
  seguridad: 500,
  transporte: 800,
  cocina: 1500
};

function calcularCostoTotal(datosEvento) {
  let costoTotal = 0; 
  costoTotal += parseInt(datosEvento.equipo) * costosServicios.equipo;
  costoTotal += parseInt(datosEvento.valorAlquiler);
  
  if (datosEvento.requiereDecoracion === 'si') {
    costoTotal += costosServicios.decoracion;
  }
  if (datosEvento.requiereSeguridad === 'si') {
    costoTotal += costosServicios.seguridad;
  }
  if (datosEvento.requiereTransporte === 'si') {
    costoTotal += costosServicios.transporte;
  }
  if (datosEvento.requiereCocina === 'si') {
    costoTotal += costosServicios.cocina;
  }


  return costoTotal;
}


app.post('/submit', (req, res) => {
    const cantidadEquipo = req.body.cantidadEquipo;
    const valorAlquiler = req.body.valorAlquiler;
    const requiereDecoracion = req.body.requiereDecoracion;
    const requiereSeguridad = req.body.requiereSeguridad;
    const requiereTransporte = req.body.requiereTransporte;
    const requiereCocina = req.body.requiereCocina;
    
    let costoTotal = 0.0;
    costoTotal += parseInt(cantidadEquipo)
    costoTotal += parseFloat(valorAlquiler)
    if(requiereDecoracion === 'si'){
      costoTotal += 0.1
    }
    if(requiereSeguridad === 'si'){
      costoTotal += 0.1
    }
    if(requiereTransporte === 'si'){
      costoTotal += 0.1
    }
    if(requiereCocina === 'si'){
      costoTotal += 0.1
    }
    
    const sql = 'INSERT INTO eventos (cantidad_equipo, valor_alquiler, requiere_decoracion, requiere_seguridad, requiere_transporte, requiere_cocina_bebidas, costo_total) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [cantidadEquipo, valorAlquiler, requiereDecoracion, requiereSeguridad, requiereTransporte, requiereCocina, costoTotal];


    connection.query(sql, values, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al guardar los datos: ' + err.message });
      }
  
      res.json({ message: 'Evento guardado correctamente y el costo del evento es: ' + costoTotal});
  });
});

app.get('/datos', (req, res) => {
  connection.query('SELECT * FROM eventos;', (err, results) => {
    if(err){
      console.log(err);
      res.status(500).send('error al optener registros');
    }else {
      res.json(results);
    }
  })
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
