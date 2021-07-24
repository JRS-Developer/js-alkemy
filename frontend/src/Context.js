import React, { useContext, useState, useCallback } from "react";
import { URI } from "./data";
import axios from "axios";

const OperationContext = React.createContext();

const OperationProvider = ({ children }) => {
	const [operations, setOperations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState({
		by: "id",
		order: "desc",
	});

	const getOperations = useCallback(
		async (limit = false) => {
			const { order, by } = filter;
			let search = `${URI}/budget?order=${order}&by=${by}`;
			if (limit) search += `&limit=${limit}`;

			const { data } = await axios.get(search);
			setOperations(data);
		},
		[filter]
	);

	return (
		<OperationContext.Provider
			value={{
				operations,
				setOperations,
				isLoading,
				setIsLoading,
				getOperations,
				filter,
				setFilter,
			}}
		>
			{children}
		</OperationContext.Provider>
	);
};

const useOperationContext = () => {
	return useContext(OperationContext);
};

export { OperationContext, OperationProvider, useOperationContext };
