// controllers/precioController.js
const calcularPrecio = (req, res) => {
    const { cantidad, tipoProducto } = req.body;
  
    // Lógica para calcular el precio
    const precio = cantidad * 10; // Ejemplo simple
  
    res.json({ precio });
  };
  
  module.exports = { calcularPrecio };