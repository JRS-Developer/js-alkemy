import { Formik, Form, Field, ErrorMessage } from "formik";
import { Fragment } from "react";
import { Link } from "react-router-dom";

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
				<Form>
					{inputs.map((input) => {
						const { name, type, id } = input;
						return (
							<Fragment key={name}>
								<label htmlFor={id}>{name}</label>
								<Field
									name={id}
									type={type}
									placeholder={name}
									id={id}
								/>
								<ErrorMessage name={id} />
							</Fragment>
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
