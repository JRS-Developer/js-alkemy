import { inputs, URI } from "../data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import { format } from "fecha";
import { toast } from "react-toastify";
import { handleError } from "./handlers";

const formInitialState = {
	concept: "",
	amount: 0,
	type: "",
};

const OperationForm = ({ id = false }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [form, setForm] = useState(formInitialState);

	const addOperation = async () => {
		const data = {
			...form,
			date: format(startDate, "YYYY-MM-DD HH:mm:ss"),
		};
		try {
			await axios.post(`${URI}/budget`, data);
			toast.success("Operation added correctly");
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
		<form onSubmit={handleSubmit}>
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
			<div>
				<button type="submit">Add Operation</button>
			</div>
		</form>
	);
};

export default OperationForm;
