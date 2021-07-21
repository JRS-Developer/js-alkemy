import axios from "axios";
import { useEffect, useState } from "react";
import { URI } from "../data";
import BudgetList from "./BudgetLIst";

const Budget = () => {
	const [total, setTotal] = useState(0);

	const fetchTotal = async () => {
		const {
			data: { total },
		} = await axios.get(`${URI}/budget/total`);
		setTotal(total);
	};
	useEffect(() => {
		fetchTotal();
	}, []);
	return (
		<>
			<h1>Personal Budget</h1>
			<h2>Actual balance: {total}</h2>
			<BudgetList />
		</>
	);
};

export default Budget;
