const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = require('passport-jwt');

// Secret, to be used to encrypt/decrypt the tokenconst secret
const secret = process.env.JWT_SECRET || 'some string value only your app knows';

const opts = {
    // (1)
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
}

const User = require('../models/User');

// (2)
const strategy = new Strategy(opts, function (jwt_payload, done) {
    // (3)
	User.findById(jwt_payload.id)
        // (4)
		.then((user) => done(null, user))
        // (5)
		.catch((err) => done(err))
})

// (6)
passport.use(strategy);

// (Initializing middleware)
passport.initialize();

// Create a variable that holds the authenticate method so we can export it for use in our routes
const requireToken = passport.authenticate('jwt', { session: false });

// Create a function that takes the request and a user document, and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
    // (7)
	if (
		!user ||
		!req.body.password ||
		!bcrypt.compareSync(req.body.password, user.password)
	) {
		const err = new Error('The provided username or password is incorrect');
		err.statusCode = 422;
		throw err;
	}
	// If no error was thrown, we create the token from user's id and
	// return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

module.exports = {
	requireToken,
	createUserToken,
};

// NOTES

// (1)
    // Define how passport should find and extract the token from the req. Sending it as a `bearer` token when front end make reqs

// (2)
    // We're configuring the strategy using the constructor from passport
    // so we call new and pass in the options we set in the `opts` variable.
    // Then we pass it a callback function that passport will use when we call
    // this as middleware.  The callback will be passed the data that was
    // extracted and decrypted by passport from the token that we get from
    // the client request!  This data (jwt_payload) will include the user's id!

// (3)
    // In the callback we run our custom code. With the data extracted from
    // the token that we're passed as jwt_payload we'll have the user's id.
    // Using Mongoose's `.findOneById()` method, we find the user in our database

// (4)
    // To pass the user on to our route, we use the `done` method that
    // that was passed as part of the callback.  The first parameter of
    // done is an error, so we'll pass null for that argument and then
    // pass the user doc from Mongoose.  This adds the user to the request object
    // as request.user!

// (5)
    // If there was an error, we pass it to done so it is eventually handled
    // by our error handlers in Express

// (6)
    // Now that we've constructed the strategy, we 'register' it so that
    // passport uses it when we call the `passport.authenticate()`
    // method later in our routes

// (7)
// Make sure that we have a user, if it's null that means we didn't
	// find the email in the database.  If there is a user, make sure
	// that the password is correct.  For security reason, we don't want
	// to tell the client whether the email was not found or that the
	// password was incorrect.  Instead we send the same message for both
	// making it much harder for hackers.

// (8)