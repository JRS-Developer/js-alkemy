import axios from "axios";
import { useEffect, useState } from "react";
import { URI } from "../data";
import BudgetList from "./BudgetList";
import styles from "../css/Budget.module.css";
import { useOperationContext } from "../Context";

const Budget = () => {
	const [total, setTotal] = useState(0);
	const { getOperations } = useOperationContext();

	const fetchTotal = async () => {
		const {
			data: { total },
		} = await axios.get(`${URI}/budget/total`);
		setTotal(total);
	};

	useEffect(() => {
		fetchTotal();
		getOperations(10);
	}, [getOperations]);
	return (
		<section className={styles.budget}>
			<h1>Personal Budget</h1>
			<h2>Actual balance: {total}$</h2>
			<h3>Last 10 operations</h3>
			<BudgetList />
		</section>
	);
};

export default Budget;
