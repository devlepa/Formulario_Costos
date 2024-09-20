const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const userRoutes = require('./routes/userRoutes');
const connection = require('./config/db'); // Assuming your db.js file is in the same directory
const app = express();
const port = 3001; // Puedes cambiar el puerto si lo deseas

app.use(express.json());

/* async function insertarUsuario(nombre, edad) {
    try {
      const [result] = await pool.execute('INSERT INTO users (username, edad) VALUES (?, ?)', [nombre, edad]);
      console.log('Nuevo usuario insertado con ID:', result.insertId);
    } catch (error) {
      console.error('Error al insertar el usuario:', error);
    }
  }
  
insertarUsuario('Juan Perez', 35); */

// Importar las rutas
app.use(express.static(path.join(__dirname, '../my-frontend/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../my-frontend/public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});