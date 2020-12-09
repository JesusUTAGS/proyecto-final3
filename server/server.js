require ('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
// Habilitar CORS
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});
app.get('/', function (req, res) {
    res.send('<h1> Bienvenido a mi servidor REST (localhost) </h1>');
});

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/login'));
app.use(require('./routes/producto'));

mongoose.connect('mongodb+srv://admin:12345678__@cluster0.zrrea.mongodb.net/cafeteria', {
  useNewUrlParser: true, 
useUnifiedTopology: true,
useFindAndModify: false,
 useCreateIndex: true
 }, (err, res ) =>  {
   if (err) throw error;
 console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Servidor esta en liena en el puerto ', process.env.PORT);
});