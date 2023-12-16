const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const db = require('./models');
const sequelize = db.sequelize

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.set('port', 3000);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
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

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더 생성');
    fs.mkdirSync('uploads');
}

// Router
const userRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
app.use('/api/auth', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

app.get('/', async (req, res) => {
    console.log(req.session.user)
    const posts = await db.Post.findAll({});
    if (req.session.user) {
        res.render('index', { auth: true, posts: posts });
    } else {
        res.render('index', { auth: false, posts: posts });
    }
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/posts', async (req, res) => {
    const posts = await db.Post.findAll({});
    console.log(posts);
    res.render('posts', { posts: posts });
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.get('/post/:id', async (req, res) => {
    const id = req.params.id
    const post = db.Post.findOne({ where: { id } });
    const comments = await db.Comment.findAll({
        where: {
            PostId: id
        },
        include: [{
            model: db.User
        }]
    });
    res.render('detail', { post: await post, comments: await comments });
})

app.get('/map', (req, res) => {
    res.render('map');
})

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


