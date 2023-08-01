const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const passport = require('passport');
const session = require('express-session');

const MongoStore = require('connect-mongo');


const app = express();
app.use(express.json())
const port = 4000;
// const dbPort = 'mongodb://localhost/';
// const dbCollection = 'streambytes-dev';
const dbName = 'mongodb://localhost/streambytes-dev';

const videoModel = require('./models/videoModel');
const commentModel = require('./models/commentModel');
const userModel = require('./models/userModel');
const videoRouter = require('./routes/videoRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./auth/auth');
const verifyToken = require('./routes/verifyToken');
const isAuthenticated = require('./routes/verifySession');

const imagesLocation = path.join(__dirname, "images");
const config = path.join(__dirname, "config");


/**establish connection to mongodb */
async function connectDB() {
    await mongoose.connect(`${dbName}`, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
}

/** allow cors */
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type','application/x-www-form-urlencoded', 'multipart/form-data'],
    allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"],
    preflightContinue: true,
    optionsSuccessStatus: 204
}))

/**enable bodyParser */
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
)


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());


app.use(express.static(path.join(__dirname,)))
app.use(express.static(('public')));

app.use(session({
    // genid:function(req){
    //   return genuuid();  
    // },
    secret: "Difficult should be walk in the park for you",
    resave: false,
    saveUninitialized: false,
    // store: new SQLiteStore({db:"sessions.db", dir:'./var/db'})
    store: MongoStore.create({ mongoUrl: dbName, collectionName: "sessions" }),
    cookie: { maxAge: 3600000, httpOnly: false },

}));

// app.use(passport.authenticate('session'));

app.use(videoRouter);
app.use(userRouter);
app.use(authRouter);



/** send video data to frontend 
 * rewrite user model to include a seperate field fro commment id
*/
app.get("/index", async (req, res) => {
    let videos = [];
    if (req.session) {
        console.log("UID from session is", req.session.id)
    }
    videos = await videoModel.find().sort({ location: 'asc' }).populate('author');
    // res.json(videos);
    // res.json("you are logged in");
    // res.setHeader('set-Cookie', ['type=ninja', 'language=javascript; HttpOnly', 'sameSite:none']);
    res.status(200).json({ videos });
    // res.render('index', {title:'Stream Bytes', videos:videos});
})

/** send image to frontend */
app.get('/sendimage/:imgName', async (req, res) => {
    const imageName = req.params.imgName;
    // console.log("image name is ", req.params.imgName);
    const imageToSend = `${imagesLocation}/${imageName}`;
    res.sendFile(imageToSend);
});




app.listen(port, () => console.log(`running on port ${port}`));
connectDB();
