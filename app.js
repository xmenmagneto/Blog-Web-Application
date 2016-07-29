var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    flash       = require('connect-flash'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground  = require('./models/campgrounds'),
    Comment     = require('./models/comment'),
    User        = require('./models/user'),
    seedDB      = require('./seeds');

//require routes
var commentRoutes       = require('./routes/comments'),
    camprgoundRoutes    = require('./routes/campgrounds'),
    authRoutes          = require('./routes/index');


mongoose.connect("mongodb://localhost/yelp_camp_11");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB(); //seed the database


//passport configuration
app.use(require('express-session')({
    secret: "Once angin Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware - add req.user to each route
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(authRoutes);
app.use('/campgrounds', camprgoundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);



app.listen(process.env.PORT, process.env.IP, function () {
    console.log('YelpCamp server has started!');
});