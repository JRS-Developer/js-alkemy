import { toast } from "react-toastify";

const handleError = (error) => {
	console.log(error);
	toast.error("An error has ocurred");
};

export { handleError };
