import axios from "axios";
import * as Yup from "yup";
import { URI } from "../data";
import { handleError } from "./handlers";
import AuthForm from "./AuthForm";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import styles from "../css/AuthForm.module.css";

const props = {
	initialValues: { email: "", password: "" },
	Schema: Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Required!"),
		password: Yup.string().min(5, "Min 5 characters").required("Required!"),
	}),
	inputs: [
		{
			name: "Email",
			id: "email",
			type: "email",
		},
		{
			name: "Password",
			id: "password",
			type: "password",
		},
	],
	link: {
		text: "Dont have an account?",
		to: "/register",
	},
	submitText: "Login",
};

const Login = () => {
	const history = useHistory();
	const AuthLogin = async (values) => {
		try {
			const { data } = await axios.post(`${URI}/auth/login`, {
				...values,
			});
			localStorage.setItem("user", JSON.stringify(data));
			toast.success("Logged successfully");
			setTimeout(() => history.push("/"), 2000);
		} catch (error) {
			handleError(error);
		}
	};

	const handleSubmit = async (values, { resetForm }, initialValues) => {
		resetForm({
			values: {
				...initialValues,
				email: values.email,
			},
		});
		AuthLogin(values);
	};

	return (
		<div className={styles.authForm__container}>
			<h1>Login</h1>
			<AuthForm {...props} handleSubmit={handleSubmit} />
		</div>
	);
};

export default Login;
