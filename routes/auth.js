var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup',

            //failureFlash: true
        }
 
    ));

    app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
	        successRedirect: '/dashboard',
	 
	        failureRedirect: '/signin',

	        //failureFlash: true
	    }
	 
	));

	  app.get('/creategame',isLoggedIn, authController.creategame);

	    app.get('/logout',authController.logout);

	    app.post('/signin', passport.authenticate('local-signin', {
		        successRedirect: '/creategame',
		 
		        failureRedirect: '/signin',

		        //failureFlash: true
		    }
		 
		));

	  app.get('/profilepage',isLoggedIn, authController.profilepage);

	    app.get('/logout',authController.logout);

	    app.post('/signin', passport.authenticate('local-signin', {
		        successRedirect: '/profilepage',
		 
		        failureRedirect: '/signin',

		        //failureFlash: true
		    }
		 
		));

		app.get('/joinedgame',isLoggedIn, authController.joinedgame);

	    app.get('/logout',authController.logout);

	    app.post('/signin', passport.authenticate('local-signin', {
		        successRedirect: '/joinedgame',
		 
		        failureRedirect: '/signin',

		        //failureFlash: true
		    }
		 
		));

    function isLoggedIn(req, res, next) {
 
	    if (req.isAuthenticated())
	     
	        return next();
	         
	    res.redirect('/signin');
	 
	}
 
}
