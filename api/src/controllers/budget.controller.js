const con = require("../database");

const table = {
	name: "budget",
	columns: ["amount", "type", "concept", "date"],
};

const handleError = (res, error) => {
	console.log(error);
	res.status(500).json({ error: "There is an error with the server" });
};

const getBudget = (req, res) => {
	let { limit, order = "desc", by = "type" } = req.query;
	let sql = `SELECT * FROM ${table.name} `;

	if (order) {
		sql += `ORDER BY ${by} ${order} `;
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
	const sql = `SELECT SUM(amount) FROM ${table.name}`;
	con.query(sql, (error, results) => {
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
	let { amount } = req.body;

	if (type === "expense" && amount > 0) {
		amount *= -1;
	}

	const sql = `INSERT INTO ${table.name} (${table.columns}) VALUES (?,?,?,?)`;
	con.query(sql, [amount, type, concept, date], (error) => {
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
