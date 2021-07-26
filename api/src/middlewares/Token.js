const { TOKEN_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
	const { token } = req.body;
	if (!token)
		return res.status(400).json({ message: "Please provide a token" });
	try {
		jwt.verify(token, TOKEN_KEY);
		next();
	} catch (error) {
		return res.status(400).json({
			message:
				"Invalid token or has expired, we cant complete your request",
		});
	}
};

module.exports = checkToken;
