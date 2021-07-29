const { TOKEN_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
	const token = req.body.token || req.params.token || req.query.token;
	if (!token)
		return res.status(401).json({ message: "Please provide a token" });
	try {
		const result = jwt.verify(token, TOKEN_KEY);
		res.locals.user = result;
		next();
	} catch (error) {
		return res.status(401).json({
			message:
				"Invalid token or has expired, we cant complete your request",
		});
	}
};

module.exports = checkToken;
