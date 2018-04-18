var express = require('express');
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var path= require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public/')));

//routes - to be replaced by requiring route files
app.get("/", function (req, res) {
    res.redirect("index");
});

app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.get("/api/home", function (req, res) {
    console.log("API home");
});

app.get("/api/user", function (req, res) {
    res.json();
});

//Models
var models = require("./models");



app.post("/creategame", function(req,res){
    req.body.user_id = req.user.id;
    models.Games.create(req.body).done(function(dbPost){
              res.redirect("dashboard");
        })
    })

app.post("/profilepage", function(req,res){

    req.body.user_id = req.user.id;
 
	models.User.findOne({where: {id: req.body.user_id}}).done(function(Users) {
		console.log(Users);
	    res.render("profilepage", Users);   
        
        })
    })

app.post("/joinedgame", function(req,res){

    // req.body.game_id = req.params.game_id;
    req.body.user_id = req.user.id;

    models.Stats.create(req.body

        // user_id: req.query.user,
        // game_id: req.query.game_id

    ).done(function(Stats){

        console.log(Stats);
        res.render("joinedgame");

    })
})

//     Player_stats.findAll({ where: { user_id: U_id } })
//     .on('success', function (stats) {
//       // Check if record exists in db
//       if (stats) {
//         stats.updateAttributes({
//           where: {game_id: id}
//         })
//         .success(function () {
//         })
//       }
//     })
// })

var authRoute = require('./routes/auth.js')(app, passport);

require('./config/passport/passport.js')(passport, models.User);
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});
//setup express app
var NODE_ENV = process.env.PORT || "production";



//sync sequelize then start express
models.sequelize.sync().then(function() {    
    app.listen(NODE_ENV, function () {
        console.log("🌎  You're listening on port: " + NODE_ENV);
    });
});
