import React, { useContext, useState, useCallback, useEffect } from "react";
import { URI } from "./data";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { handleTokenError } from "./components/handlers";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [operations, setOperations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [authToken, setAuthToken] = useState("");
	const [filter, setFilter] = useState({
		by: "id",
		order: "desc",
	});
	const history = useHistory();
	const location = useLocation();

	const getOperations = useCallback(
		async (limit = false) => {
			try {
				if (authToken) {
					const { order, by } = filter;
					let query = `${URI}/budget?order=${order}&by=${by}`;
					if (limit) query += `&limit=${limit}`;
					const { data } = await axios.get(query, {
						params: {
							token: authToken,
						},
					});
					setOperations(data);
					setIsLoading(false);
				}
			} catch (error) {
				handleTokenError(error);
			}
		},
		[filter, authToken]
	);

	const checkUserLogged = useCallback(async () => {
		const user = await JSON.parse(localStorage.getItem("user"));
		if (user) {
			setAuthToken(user.token);
			return true;
		} else {
			setAuthToken("");
			if (
				location.pathname !== "/login" &&
				location.pathname !== "/register"
			) {
				history.replace("/login");
			}
		}
	}, [history, location.pathname]);

	useEffect(() => {
		checkUserLogged();
		setIsLoading(true);
	}, [checkUserLogged]);

	return (
		<AppContext.Provider
			value={{
				operations,
				setOperations,
				isLoading,
				setIsLoading,
				getOperations,
				filter,
				setFilter,
				checkUserLogged,
				authToken,
				setAuthToken,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
