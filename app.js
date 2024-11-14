// Imports
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar las variables de entorno desde .env
const Product = require('./models/Product'); // Importa el modelo de Producto

// Configuración de la aplicación
const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000 // Configura tiempo de espera a 30 segundos
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error de conexión:', error));

// Configuración de archivos estáticos y motor de vistas
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));

app.set('views', './views');
app.set('view engine', 'ejs');

// Datos de ejemplo para el carrito
const cartItems = [
  { name: "Bacardi 151", price: "$100.000", quantity: 10, imageUrl: "img/prod-1.jpg" },
  { name: "Jim Beam Kentucky Straight", price: "$120.000", quantity: 2, imageUrl: "img/prod-2.jpg" },
  { name: "Citadelle", price: "$95.000", quantity: 15, imageUrl: "img/prod-3.jpg" }
];

// Rutas
app.get('/', (req, res) => {
  res.render('index', { cartItems });
});

app.get('/about', (req, res) => {
  res.render('about', { cartItems });
});

app.get('/blog-single', (req, res) => {
  const categories = ['Cursos', 'Noticias relevantes', 'Coctelería', 'Últimas novedades', 'Farandula', 'Si'];
  res.render('blog-single', { categories, cartItems });
});

app.get('/blog', (req, res) => {
  res.render('blog', { cartItems });
});

app.get('/cart', (req, res) => {
  res.render('cart', { cartItems });
});

app.get('/checkout', (req, res) => {
  res.render('checkout', { cartItems });
});

app.get('/contact', (req, res) => {
  const contactInfo = {
    address: "Cl. 53 #47, Laureles - Estadio, Medellín",
    phone: "+57 100 2355 98",
    email: "cerdeña@gmail.com",
    website: "cerdeñalicorera.com",
    instagram: "www.instagram/charcuteriaCerdeña.com"
  };
  res.render('contact', { cartItems, contactInfo });
});

app.get('/offers', (req, res) => {
  res.render('offers', { cartItems });
});

app.get('/product', async (req, res) => {
  try {
    const products = await Product.find(); // Consulta todos los productos en MongoDB
    const tipos = ["Brandy", "Gin", "Ron", "Tequila", "Vodka", "Whiskey", "Minimarket"];
    res.render('product', { products, tipos, cartItems });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

// Iniciar el servidor solo después de conectar a la base de datos
mongoose.connection.once('open', () => {
  app.listen(port, () => console.log(`Servidor ejecutándose en http://localhost:${port}`));
});
