const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const routes = require('./routes/routes');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.connection.on('error', (err) => console.log('Couldnot connect to db: ' + err));
mongoose.connection.on('success', (() => console.log('Successfully connected to databse.')));

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(helmet());
app.use(cors());
app.use(express.json())
app.use('/api/employees', routes)

app.get('/', (req,res) => {
    res.send('<h1>Server Up and running!<h2>')
  })

app.listen(PORT);