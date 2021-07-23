import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URI } from "../data";
import BudgetItem from "./BudgetItem";
import styles from "../css/BudgetList.module.css";
import BudgetListHeader from "./BudgetListHeader";

const BudgetList = ({
	limit = false,
	editable = false,
	order = "desc",
	by = "id",
}) => {
	const [Operations, setOperations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getOperations = useCallback(async () => {
		let search = `${URI}/budget?order=${order}&by=${by}`;
		if (limit) search += `&limit=${limit}`;

		const { data } = await axios.get(search);
		if (Array.isArray(data)) {
			setOperations(data);
		}
		setIsLoading(false);
	}, [limit, order, by]);

	useEffect(() => {
		getOperations();
	}, [getOperations]);

	return (
		<ul className={styles.budgetList}>
			{isLoading ? (
				<h2>Loading...</h2>
			) : (
				<BudgetListHeader editable={editable} />
			)}
			{!isLoading && Operations.length === 0 ? (
				<h2>There are no results</h2>
			) : (
				Operations.map((operation) => {
					const { id, concept } = operation;
					return (
						<BudgetItem
							operation={operation}
							key={`${id}-${concept}`}
							editable={editable}
							getOperations={getOperations}
						/>
					);
				})
			)}
		</ul>
	);
};

export default BudgetList;
