import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { URI } from "../data";
import AuthForm from "./AuthForm";
import { handleError } from "./handlers";
import * as Yup from "yup";
import styles from "../css/AuthForm.module.css";

const props = {
	initialValues: { email: "", password: "", confirmPassword: "" },
	Schema: Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Required!"),
		password: Yup.string().min(5, "Min 5 characters").required("Required!"),
		confirmPassword: Yup.string().when("password", {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref("password")],
				"The passwords must match"
			),
		}),
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
		{
			name: "Confirm Pasword",
			id: "confirmPassword",
			type: "password",
		},
	],
	link: {
		text: "Already with an account?",
		to: "/login",
	},
	submitText: "Register",
};

const Register = () => {
	const history = useHistory();

	const registerUser = async (values) => {
		try {
			const {
				data: { message },
			} = await axios.post(`${URI}/auth/register`, {
				...values,
			});
			toast.success(message);
			setTimeout(() => {
				history.push("/login");
				toast.info("Please login in your account");
			}, 2000);
		} catch (error) {
			handleError(error);
		}
	};

	const handleSubmit = (values, { resetForm }, initialValues) => {
		resetForm({
			values: {
				...initialValues,
			},
		});
		registerUser(values);
	};

	return (
		<div className={styles.authForm__container}>
			<h1>Register</h1>
			<AuthForm {...props} handleSubmit={handleSubmit} />
		</div>
	);
};

export default Register;
