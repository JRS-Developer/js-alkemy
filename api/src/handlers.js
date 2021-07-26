const handleError = (res, error) => {
	console.log(error);
	res.status(500).json({ error: "There is an error with the server" });
};

module.exports = {
	handleError,
};
