import axios from "axios";
import { useEffect, useState } from "react";
import { URI } from "../data";
import BudgetList from "./BudgetList";
import styles from "../css/Budget.module.css";

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
		<section className={styles.budget}>
			<h1>Personal Budget</h1>
			<h2>Actual balance: {total}</h2>
			<h3>Last 10 operations</h3>
			<BudgetList limit={10} />
		</section>
	);
};

export default Budget;
