const app = require("./app");
const PORT = app.get("port");
require("./database");

const main = async () => {
	await app.listen(PORT);
	console.log("Server running on port", PORT);
};

main();
