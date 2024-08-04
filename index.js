const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
	// serve up production assets
	app.use(express.static('client/build'));
	const path = require('path');
	// serve up index.html for unknown routes
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
