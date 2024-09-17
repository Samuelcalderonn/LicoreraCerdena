// Imports
const express = require('express');
const app = express();
const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

const cartItems = [
  { name: "Bacardi 151", price: "$100.000", quantity: 10, imageUrl: "img/prod-1.jpg" },
  { name: "Jim Beam Kentucky Straight", price: "$120.000", quantity: 2, imageUrl: "img/prod-2.jpg" },
  { name: "Citadelle", price: "$95.000", quantity: 15, imageUrl: "img/prod-3.jpg" }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', {cartItems});
});

app.get('/about', (req, res) => {
    res.render('about', {cartItems});
  });

app.get('/blog-single', (req, res) => {
  const categories = [
    'Cursos',
    'Noticias relevantes',
    'Coctelería',
    'Últimas novedades',
    'Farandula',
    'Si'
  ];

  res.render('blog-single', {categories, cartItems});
});

app.get('/blog', (req, res) => {
  res.render('blog', {cartItems});
});

app.get('/cart', (req, res) => {
  res.render('cart', {cartItems});
});

app.get('/checkout', (req, res) => {
  res.render('checkout', {cartItems});
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
  res.render('offers', {cartItems});
});

app.get('/product', (req, res) => {
  const products = [
    { nombre: "Bacardi 151", precio: 199.000, tipo: "Brandy", precioSinDescuento: 350.000 },
    { nombre: "Jim Beam Kentucky Straight", precio: 250.000, tipo: "Gin", precioSinDescuento: 350.000 },
    { nombre: "Citadelle", precio: 250.000, tipo: "Ron", precioSinDescuento: 350.000 },
    { nombre: "The Glenlivet", precio: 250.000, tipo: "Ron", precioSinDescuento: 350.000 },
    { nombre: "Black Label", precio: 250.000, tipo: "Whiskey", precioSinDescuento: 350.000 },
    { nombre: "The Macallan", precio: 250.000, tipo: "Tequila", precioSinDescuento: 350.000 },
    { nombre: "Old Monk", precio: 250.000, tipo: "Vodka", precioSinDescuento: 350.000 },
    { nombre: "Jameson Irish Whiskey", precio: 250.000, tipo: "Whiskey", precioSinDescuento: 350.000 },
    { nombre: "Screwball", precio: 250.000, tipo: "Whiskey", precioSinDescuento: 350.000 },
    { nombre: "Jack Daniel's", precio: 250.000, tipo: "Whiskey", precioSinDescuento: 350.000 },
    { nombre: "McClelland's", precio: 250.000, tipo: "Whiskey", precioSinDescuento: 350.000 },
    { nombre: "Plantation", precio: 250.000, tipo: "Ron", precioSinDescuento: 350.000 },
    

];

  const tipos = ["Brandy", "Gin", "Rom", "Tequila", "Vodka", "Whiskey", "Minimarket"];
  res.render('product', {products, tipos, cartItems});
});


// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));

