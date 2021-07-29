import { inputs, URI } from "../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import { format } from "fecha";
import { toast } from "react-toastify";
import { handleError } from "./handlers";
import styles from "../css/OperationForm.module.css";
import { useAppContext } from "../Context";

const formInitialState = {
	concept: "",
	amount: "",
	type: "",
};

const OperationForm = ({ id = false }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [form, setForm] = useState(formInitialState);
	const { getOperations, authToken } = useAppContext();

	const addOperation = async () => {
		const data = {
			...form,
			date: format(startDate, "YYYY-MM-DD HH:mm:ss"),
		};
		try {
			await axios.post(`${URI}/budget`, data, {
				params: {
					token: authToken,
				},
			});
			toast.success("Operation added correctly");
			setForm(formInitialState);
			getOperations();
		} catch (error) {
			handleError(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addOperation();
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setForm({ ...form, [id]: value });
	};

	return (
		<div className={styles.OperationForm__container}>
			<h1>Add a operation</h1>
			<form onSubmit={handleSubmit} className={styles.OperationForm}>
				{inputs.map((input) => {
					const { name, type, id } = input;
					return (
						<div key={`${name}-${id}`}>
							<label htmlFor={name}>{name}</label>
							<input
								type={type}
								name={name}
								id={id}
								value={form[id]}
								onChange={handleChange}
								required
								min="0"
								placeholder={name}
							/>
						</div>
					);
				})}
				<div>
					<label htmlFor="type">Type</label>
					<select
						name="type"
						id="type"
						placeholder="Type"
						disabled={id ? true : false}
						onChange={handleChange}
						value={form.type}
						required
					>
						<option value="" disabled>
							Choose an option
						</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
				</div>
				<div>
					<label htmlFor="date">Date</label>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						showTimeSelect
						id="date"
						dateFormat="MMMM d, yyyy h:mm aa"
					/>
				</div>
				<button type="submit">Add Operation</button>
			</form>
		</div>
	);
};

export default OperationForm;
