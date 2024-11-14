// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  tipo: { type: String, required: true },
  precioSinDescuento: { type: Number },
  descripcion: { type: String }
}, { collection: 'products' }); // Especifica la colección 'products'

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
