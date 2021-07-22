import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URI } from "../data";
import BudgetItem from "./BudgetItem";

const BudgetList = ({ limit = false, editable = false }) => {
	const [Operations, setOperations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getOperations = useCallback(async () => {
		let search = `${URI}/budget?order=desc&by=id`;
		if (limit) search += `&limit=${limit}`;

		const { data } = await axios.get(search);
		setOperations(data);
		setIsLoading(false);
	}, [limit]);

	useEffect(() => {
		getOperations();
	}, [getOperations]);

	return (
		<div>
			<ul>
				{!isLoading && Operations.length === 0 && (
					<h2>There are no results</h2>
				)}
				{isLoading ? (
					<h2>Loading...</h2>
				) : (
					Operations.map((operation) => {
						const { id } = operation;
						return (
							<BudgetItem
								operation={operation}
								key={id}
								editable={editable}
								getOperations={getOperations}
							/>
						);
					})
				)}
			</ul>
		</div>
	);
};

export default BudgetList;
