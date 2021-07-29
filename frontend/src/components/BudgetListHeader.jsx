import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../Context";
import styles from "../css/BudgetListHeader.module.css";

const sectionsList = [
	{ name: "Concept", type: "data" },
	{ name: "Amount", type: "data" },
	{ name: "Type", type: "data" },
	{ name: "Date", type: "data" },
];

const BudgetListHeader = ({ editable }) => {
	const { filter, setFilter } = useAppContext();

	const changeOrder = (id) => {
		const { order } = filter;
		const newOrder = {
			by: id,
			order: order === "desc" ? "asc" : "desc",
		};
		setFilter(newOrder);
	};

	const handleClick = (e) => {
		if (editable) {
			const { id } = e.target;
			changeOrder(id);
		}
	};

	return (
		<li
			className={`${styles.budgetList__header} ${
				editable && styles["budgetList__header--editable"]
			}`}
		>
			{sectionsList.map((section, index) => {
				const { name } = section;
				return (
					<p
						key={`${index}-${name}`}
						onClick={handleClick}
						id={name}
						className={`${
							editable && styles.budgetList__header__item
						} ${
							name === filter.by && editable && styles["active"]
						} ${filter.order === "asc" && styles["revert"]}`}
					>
						{name}
						{editable && name === filter.by && <FaCaretDown />}
					</p>
				);
			})}
			{editable && <p id={"Options"}>Options</p>}
		</li>
	);
};

export default BudgetListHeader;
