const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');


const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const connection = require('./config/db'); // Assuming your db.js file is in the same directory


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '13octubre',
    database: 'db_costo'
  });

const app = express();
const port = 3001; // Puedes cambiar el puerto si lo deseas

app.use(express.json());

async function insertarUsuario(nombre, edad) {
    try {
      const [result] = await pool.execute('INSERT INTO users (username, edad) VALUES (?, ?)', [nombre, edad]);
      console.log('Nuevo usuario insertado con ID:', result.insertId);
    } catch (error) {
      console.error('Error al insertar el usuario:', error);
    }
  }
  
insertarUsuario('Juan Perez', 35);

// Ruta para agregar un nuevo usuario
/* app.post('/api/users', (req, res) => {
   const { username, edad } = req.body;
 
   // Validación de campos
   if (!username || isNaN(edad) || edad < 0) {
     return res.status(400).send('Datos inválidos. Verifica el nombre de usuario y la edad.');
   }

  // Query para insertar el usuario
  const query = 'INSERT INTO users (username, edad) VALUES (?, ?)';
  db.query(query, [username, edad], (err, result) => {
    if (err) {
      console.error('Error al insertar el usuario:', err);
      return res.status(500).send('Hubo un error al agregar el usuario');
    }

    res.status(201).send('Usuario agregado con éxito');
  });
}); */

// Importar las rutas
app.use(express.static(path.join(__dirname, '../my-frontend/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../my-frontend/public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});