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
			
			models.Stats.findAll({

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

exports.profilepage = function(req, res) {
	var name = req.param('name');

	models.User.findOne({where: {firstname: name}}).then(function(Users) {
		var Users = Users
		console.log(Users);
	res.render("profilepage", Users.dataValues);

})
}

exports.creategame = function(req, res) {
	var user_id = req.param('user');
	
	models.User.findAll({where: {id: user_id}}).then(function(Users) {
	res.render("creategame", Users);
})
}

exports.joinedgame = function(req, res) {
	
	var id = req.param('game_id');
	var user_id = req.param('user_id');

	models.Games.findAll({

		where: {id:id}

	}).then(function(Game){
		
		models.Stats.findAll({

			// where: {game_id:id}

		}).then(function(Stats) {
			
			models.User.findAll({
				
				

			}).then(function(Users) {

				// for (var i = 0; i < Stats.length; i++) {
				// 	if (Stats[i].user_id == user_id && Stats[i].game_id == id){
				// 		Stats[i].usergame = true;
				// 	}
				// 	else{
				// 		Game[i].usergame = false;
				// 	}
				
				// }

				for (var i = 0; i < Users.length; i++) {
					if (Users[i].id == req.user.id){
						Users[i].userplaying = true;
					}
					else{
						Users[i].userplaying = false;
					}
				}




				var	data = {
					Games: Game,
					Users: Users,
					Stats: Stats
					}

	console.log(data);
	console.log(Stats);
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