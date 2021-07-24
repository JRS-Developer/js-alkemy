import { useEffect } from "react";
import BudgetItem from "./BudgetItem";
import styles from "../css/BudgetList.module.css";
import BudgetListHeader from "./BudgetListHeader";
import { useOperationContext } from "../Context";

const BudgetList = ({ editable = false }) => {
	const { operations, isLoading, setIsLoading } = useOperationContext();

	useEffect(() => {
		if (Array.isArray(operations) && isLoading) {
			setIsLoading(false);
		}
	}, [operations, isLoading, setIsLoading]);

	return (
		<ul className={styles.budgetList}>
			{isLoading ? (
				<h2>Loading...</h2>
			) : (
				<BudgetListHeader editable={editable} />
			)}
			{Array.isArray(operations) ? (
				operations.map((operation) => {
					const { id, concept } = operation;
					return (
						<BudgetItem
							operation={operation}
							key={`${id}-${concept}`}
							editable={editable}
						/>
					);
				})
			) : (
				<h2>There are no results</h2>
			)}
		</ul>
	);
};

export default BudgetList;
