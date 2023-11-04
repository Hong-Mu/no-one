const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { sequelize } = require('./models');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

sequelize.sync({ force: false })
    .then(() => {
        console.log('연결 성공');
    }).catch((err) => {
        console.log(err);
    });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'Running!');
});