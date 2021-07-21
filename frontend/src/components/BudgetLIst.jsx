import axios from "axios";
import { useEffect, useState } from "react";
import { URI } from "../data";

const BudgetList = () => {
	const [Operations, setOperations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getOperations = async () => {
		const { data } = await axios.get(
			`${URI}/budget?limit=10&order=desc&by=id`
		);
		setOperations(data);
		setIsLoading(false);
	};

	useEffect(() => {
		getOperations();
	}, []);

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
						const { id, concept, amount, type, date } = operation;
						return (
							<li key={id}>
								<h3>{concept}</h3>
								<p>{amount}</p>
								<p>{type}</p>
								<p>{date}</p>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
};

export default BudgetList;
