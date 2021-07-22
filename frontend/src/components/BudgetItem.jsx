import axios from "axios";
import { format } from "fecha";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { URI } from "../data";
import "react-datepicker/dist/react-datepicker.css";
import { handleError } from "./handlers";

const BudgetItem = ({
	operation: { id, concept, amount, type, date },
	editable,
	getOperations,
}) => {
	const [startDate, setStartDate] = useState(new Date(date));
	const [isEditing, setIsEditing] = useState(false);
	const conceptRef = useRef(null);
	const amountRef = useRef(null);

	const editItem = () => {
		setIsEditing(true);
	};

	const deleteItem = async () => {
		try {
			await axios.delete(`${URI}/budget/${id}`);
			toast.success("Operation deleted correctly");
			getOperations();
		} catch (error) {
			handleError(error);
		}
	};

	const updateItem = async () => {
		const { value: conceptValue } = conceptRef.current;
		const { value: amountValue } = amountRef.current;
		const data = {
			concept: conceptValue,
			amount: amountValue,
			date: format(startDate, "YYYY-MM-DD HH:mm:ss"),
		};

		try {
			await axios.put(`${URI}/budget/${id}`, data);
			toast.success("Operation edited correctly");
			getOperations();
			setIsEditing(false);
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<li>
			{isEditing ? (
				<>
					<input
						type="text"
						defaultValue={concept}
						ref={conceptRef}
					/>
					<input
						type="number"
						defaultValue={amount}
						ref={amountRef}
					/>
					<p title={"The type is not editable"}>{type}</p>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						showTimeSelect
						dateFormat="MMMM d, yyyy h:mm aa"
					/>
					<p onClick={updateItem}>Save</p>
				</>
			) : (
				<>
					<h3>{concept}</h3>
					<p>{amount}$</p>
					<p>{type}</p>
					<p>{format(new Date(date))}</p>
					{editable && (
						<>
							<p onClick={() => editItem()}>Edit</p>
							<p onClick={() => deleteItem()}>Delete</p>
						</>
					)}
				</>
			)}
		</li>
	);
};

export default BudgetItem;
