const con = require("../database");
const { handleError } = require("../handlers");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { TOKEN_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const table = {
	name: "users",
	columns: ["email", "password"],
};

const authUser = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).send("Please provide all the credentials");

	try {
		const lowerEmail = email.toLowerCase();
		const sql = `SELECT * FROM ${table.name} WHERE email = ?`;
		const [rows] = await con.promise().query(sql, [lowerEmail]);

		if (rows.length === 0)
			return res.status(400).json({
				message: "There is not any user registered with that email",
			});

		const { password: hashPassword } = rows[0];
		const match = await checkUserPassword(password, hashPassword);

		return match
			? res.status(200).json({
					email: lowerEmail,
					password: hashPassword,
					token: createToken({
						email: lowerEmail,
						password: hashPassword,
					}),
			  })
			: res.status(400).json({ message: "The credentials are invalid" });
	} catch (error) {
		handleError(res, error);
		return;
	}
};

const createUser = async (req, res) => {
	const { email, password, password2 } = req.body;
	if (!email || !password || !password2) {
		return res.status(400).send("Please provide all the credentials");
	}

	if (password !== password2) {
		return res.status(400).json({ message: "The password must match" });
	}

	if (await checkUserIsRegistered(email)) {
		return res.status(400).json({
			message: "There is already an user registered with that email",
		});
	}

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const emailLower = email.toLowerCase();

		const sql = `INSERT INTO ${table.name} (${table.columns}) VALUES (?,?)`;
		await con.promise().query(sql, [emailLower, hashedPassword]);

		res.status(201).json({ message: "User created succesfully" });
	} catch (error) {
		handleError(res, error);
		return;
	}
};

const checkUserIsRegistered = async (email) => {
	const sql = `SELECT * FROM ${table.name} WHERE email = ?`;
	return con
		.promise()
		.query(sql, [email])
		.then(([rows]) => {
			return rows.length > 0;
		});
};

const checkUserPassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

const createToken = (data) => {
	return jwt.sign({ ...data }, TOKEN_KEY, { expiresIn: "24h" });
};

module.exports = {
	authUser,
	createUser,
};
