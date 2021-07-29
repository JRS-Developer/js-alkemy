const con = require("../database");
const { handleError } = require("../handlers");

const escapeSansQuotes = (connection, criterion) => {
	return connection.escape(criterion).match(/^'(\w+)'$/)[1];
};

const table = {
	name: "budget",
	columns: ["amount", "type", "concept", "date", "userID"],
};

const getBudget = (req, res) => {
	const userID = res.locals.user.id;
	let { limit, order = "asc", by = "type" } = req.query;
	let sql = `SELECT * FROM ${table.name} WHERE userID= ${con.escape(
		userID
	)} `;

	if (order) {
		sql += `ORDER BY ${escapeSansQuotes(con, by)} ${escapeSansQuotes(
			con,
			order
		)} `;
	}

	if (limit) {
		limit = parseInt(limit);
		sql += `LIMIT ${con.escape(limit)} `;
	}

	con.query(sql, (error, results) => {
		if (error) {
			handleError(res, error);
			return;
		}
		if (results.length == 0) {
			res.json({ message: "There are no results" });
			return;
		}
		res.json(results);
	});
};

const getBudgetTotal = (_req, res) => {
	const userID = res.locals.user.id;
	const sql = `SELECT SUM(amount) FROM ${table.name} WHERE userID = ?`;
	con.query(sql, [userID], (error, results) => {
		if (error) {
			handleError(res, error);
			return;
		}
		if (results[0]["SUM(amount)"]) {
			const total = results[0]["SUM(amount)"].toFixed(2);
			res.json({ total });
		} else {
			res.json({ total: 0.0 });
		}
	});
};

const insertBudget = (req, res) => {
	const { type, concept, date } = req.body;
	const userID = res.locals.user.id;
	let { amount } = req.body;

	if (type === "expense" && amount > 0) {
		amount *= -1;
	}

	const sql = `INSERT INTO ${table.name} (${table.columns}) VALUES (?,?,?,?,?)`;
	con.query(sql, [amount, type, concept, date, userID], (error) => {
		if (error) {
			handleError(res, error);
			return;
		}
	});
	res.status(201).json({ message: "Data inserted correctly" });
};

const updateBudget = (req, res) => {
	const { amount, concept, date } = req.body;
	const { id } = req.params;
	const sql = `UPDATE ${table.name} SET amount=?, concept=?,date=? WHERE id = ?`;

	con.query(sql, [amount, concept, date, id], (error) => {
		if (error) {
			handleError(res, error);
			return;
		}
	});

	res.status(201).json({ message: "Data updated correctly" });
};

const deleteBudget = (req, res) => {
	const { id } = req.params;
	const sql = `DELETE FROM ${table.name} WHERE id = ?`;
	con.query(sql, [id], (error) => {
		if (error) {
			handleError(res, error);
			return;
		}
	});
	res.status(201).json({ message: "Data deleted correctly" });
};

module.exports = {
	getBudget,
	getBudgetTotal,
	insertBudget,
	updateBudget,
	deleteBudget,
};
