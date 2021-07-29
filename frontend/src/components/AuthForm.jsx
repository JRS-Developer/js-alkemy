import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import styles from "../css/AuthForm.module.css";

const AuthForm = ({
	Schema,
	initialValues,
	handleSubmit,
	inputs,
	link,
	submitText,
}) => {
	return (
		<>
			<Formik
				initialValues={{ ...initialValues }}
				validationSchema={Schema}
				onSubmit={(values, actions) =>
					handleSubmit(values, actions, initialValues)
				}
			>
				<Form className={styles.authForm}>
					{inputs.map((input) => {
						const { name, type, id } = input;
						return (
							<div
								key={name}
								className={styles["authForm__input-container"]}
							>
								<label htmlFor={id}>{name}</label>
								<Field
									name={id}
									type={type}
									placeholder={name}
									id={id}
								/>
								<ErrorMessage
									name={id}
									component="span"
									className={styles.error}
								/>
							</div>
						);
					})}
					<button type="submit">{submitText}</button>
				</Form>
			</Formik>
			<Link to={link.to}>{link.text}</Link>
		</>
	);
};

export default AuthForm;
