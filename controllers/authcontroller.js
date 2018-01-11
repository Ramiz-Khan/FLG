var exports = module.exports = {}

var models = require("../models");
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}
exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req, res) {

	models.Games.findAll({

	}).then(function(Game){
		
		var userGame;
		var otherGame;
		for (var i = 0; i < Game.length; i++) {
			if (Game[i].user_id == req.user.id){
				Game[i].usergame = true;
			}
			else{
				Game[i].usergame = false;
			}
		}

		models.User.findAll({

		}).then(function(Users) {
			
			models.Player_stats.findAll({

			}).then(function(Stats) {

				var	data = {
					Games: Game,
					Users: Users,
					Stats: Stats
					}
	console.log(data)
	res.render("dashboard", data);
			})
		})
	})
}
// 	models.Games.findAll().then(function(done){
		
// 		var hbrsObject = {
// 			Games: done,
// 			userGame : userGame
// 		}
// 		console.log(hbrsObject);
// 	    res.render("dashboard", hbrsObject);
// 	})
 
// }

exports.viewgames = function(req, res) {
	res.render("viewgames");
}

exports.creategame = function(req, res) {
	res.render("creategame");
}

exports.joinedgame = function(req, res) {
	
	var id = req.param('game_id');
	var user_id = req.param('user');

	models.Games.findAll({

		where: {id:id}

	}).then(function(Game){
		
		models.User.findAll({

		}).then(function(Users) {
			
			models.Player_stats.findAll({

			}).then(function(Stats) {

				var	data = {
					Games: Game,
					Users: Users,
					Stats: Stats
					}

	console.log(data)
	res.render("joinedgame", data);
			})
		})
	})
}




		
		

		// for (var i = 0; i < Game.length; i++) {
		// 	if (Game[i].id == id){	
		// 		Game[i].userplaying = true;
		// 	}

		// }


		// var hbsObject = {
		// 	Games: Game,
		// 	id: id,
		// 	user_id: user_id		
		// }




	


exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}