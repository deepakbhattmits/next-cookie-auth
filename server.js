/** @format */

const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = 'q1w2e3r4t5y6';
const COOKIE_OPTIONS = {
	// domain:"http://yourDomain.com",
	httpOnly: true,
	secure: !dev,
	signed: true,
};

const app = next({ dev });

const handle = app.getRequestHandler();
const authenticate = async (email, password) => {
	const { data } = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);
	return data.find((user) => {
		if (user.email === email && user.website === password) {
			return user;
		}
	});
};
app.prepare().then(() => {
	const server = express();
	server.use(express.json()); // parse
	server.use(cookieParser(COOKIE_SECRET)); // cookie parser
	server.post('/api/login', async (req, res) => {
		const { email, password } = req.body;
		const user = await authenticate(email, password);
		if (!user) {
			return res.status(403).send('Invalid Email or password');
		}
		const userData = {
			name: user.name,
			email: user.email,
			type: AUTH_USER_TYPE,
		};
		res.cookie('token', userData, COOKIE_OPTIONS);
		res.json(userData);
	});
	server.post('/api/logout', async (req, res) => {
		res.clearCookie('token', COOKIE_OPTIONS);
		res.sendStatus(204);
	});
	server.get('/api/profile', async (req, res) => {
		const { signedCookies = {} } = req;
		const { token } = signedCookies;
		if (token && token.email) {
			const { data } = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			const userProfile = data.find((user) => user.email.includes(token.email));
			return res.json({ user: userProfile });
		}
		res.sendStatus(404);
	});
	server.get('*', (req, res) => {
		return handle(req, res);
	});
	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`listening on PORT ${port}`);
	});
});
