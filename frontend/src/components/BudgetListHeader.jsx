import React from "react";
import styles from "../css/BudgetList.module.css";

const BudgetListHeader = ({ editable }) => {
	return (
		<li
			className={`${styles.budgetList__header} ${
				editable && styles["budgetList__header--editable"]
			}`}
		>
			<p>
				<b>Concept</b>
			</p>
			<p>
				<b>Amount</b>
			</p>
			<p>
				<b>Type</b>
			</p>
			<p>
				<b>Date</b>
			</p>
			{editable && (
				<p>
					<b>Options</b>
				</p>
			)}
		</li>
	);
};

export default BudgetListHeader;
