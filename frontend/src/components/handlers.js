import { toast } from "react-toastify";

const handleError = (error) => {
	const {
		data: { message },
	} = error.response;
	message ? toast.error(message) : toast.error("An error has ocurred");
};

const handleTokenError = (error) => {
	const { status } = error.response;
	console.log(error.response);
	if (Number(status) >= 400 && Number(status) < 500) {
		localStorage.removeItem("user");
		window.location.reload();
	}
};

export { handleError, handleTokenError };
