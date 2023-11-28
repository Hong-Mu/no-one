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

// Router
const userRouter = require('./routes/auth');
app.use('/auth', userRouter);

// Database
sequelize.sync({ force: false })
    .then(() => {
        console.log('DB Connected!');
    }).catch((err) => {
        console.log(err);
    });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'Running!');
});


