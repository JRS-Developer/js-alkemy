import React from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

const LogOutButton = () => {
	const history = useHistory();

	const LogOutUser = (e) => {
		e.preventDefault();
		localStorage.removeItem("user");
		toast.info("Session closed");
		setTimeout(() => history.push("/login"), 2000);
	};

	return (
		<Link to="/login" onClick={LogOutUser}>
			Log Out
		</Link>
	);
};

export default LogOutButton;
