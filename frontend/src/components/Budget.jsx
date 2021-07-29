import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URI } from "../data";
import BudgetList from "./BudgetList";
import styles from "../css/Budget.module.css";
import { useAppContext } from "../Context";
import { handleTokenError } from "./handlers";

const Budget = () => {
	const [total, setTotal] = useState(0);
	const { getOperations, checkUserLogged, authToken } = useAppContext();

	const fetchTotal = useCallback(async () => {
		try {
			const {
				data: { total },
			} = await axios.get(`${URI}/budget/total`, {
				params: {
					token: authToken,
				},
			});
			setTotal(total);
		} catch (error) {
			handleTokenError(error);
		}
	}, [authToken]);

	const getData = useCallback(async () => {
		if (authToken) {
			await fetchTotal();
			await getOperations(10);
		}
	}, [fetchTotal, getOperations, authToken]);

	useEffect(() => {
		if (checkUserLogged()) {
			getData();
		}
	}, [getData, checkUserLogged]);

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
