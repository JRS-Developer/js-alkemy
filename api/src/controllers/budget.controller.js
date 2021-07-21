const con = require("../database");

const table = {
	name: "budget",
	columns: ["amount", "type", "concept", "date"],
};

const getTotal = (results) => {
	return results
		.reduce((previous, current) => {
			if (current.type === "expense") current.amount *= -1;
			return previous + current.amount;
		}, 0)
		.toFixed(2);
};

const handleError = () => {
	res.status(500).json({ error: "There is an error with the server" });
};

const getBudget = async (req, res) => {
	const sql = `SELECT * FROM ${table.name}`;
	await con.query(sql, (error, results) => {
		if (error) {
			handleError();
			return;
		}
		if (results.length == 0) {
			res.json({ message: "There are no results" });
			return;
		}
		res.json({ total: getTotal(results), results: [results] });
	});
};

const insertBudget = async (req, res) => {
	const { amount, type, concept, date } = req.body;
	const sql = `INSERT INTO ${table.name} (${table.columns}) VALUES (?,?,?,?)`;
	await con.query(sql, [amount, type, concept, date], (error) => {
		if (error) {
			handleError();
			return;
		}
	});
	res.status(201).json({ message: "Data inserted correctly" });
};

const updateBudget = async (req, res) => {
	const { amount, concept, date } = req.body;
	const { id } = req.params;
	const sql = `UPDATE ${table.name} SET amount=?, concept=?,date=? WHERE id = ?`;

	await con.query(sql, [amount, concept, date, id], (error) => {
		if (error) {
			handleError();
			return;
		}
	});

	res.status(201).json({ message: "Data updated correctly" });
};

const deleteBudget = async (req, res) => {
	const { id } = req.params;
	const sql = `DELETE FROM ${table.name} WHERE id = ?`;
	await con.query(sql, [id], (error) => {
		if (error) {
			handleError();
			return;
		}
	});
	res.status(201).json({ message: "Data deleted correctly" });
};

module.exports = {
	getBudget,
	insertBudget,
	updateBudget,
	deleteBudget,
};
