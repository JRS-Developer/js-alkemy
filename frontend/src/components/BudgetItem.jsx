import axios from "axios";
import { format } from "fecha";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { URI } from "../data";
import "react-datepicker/dist/react-datepicker.css";
import { handleError } from "./handlers";
import styles from "../css/BudgetItem.module.css";
import { FiEdit, FiDelete, FiSave } from "react-icons/fi";
import { useAppContext } from "../Context";

const BudgetItem = ({
    operation: { _id, concept, amount, type, date },
    editable,
}) => {
    const [startDate, setStartDate] = useState(new Date(date));
    const [isEditing, setIsEditing] = useState(false);
    const { getOperations, authToken } = useAppContext();
    const conceptRef = useRef(null);
    const amountRef = useRef(null);

    const editItem = () => {
        setIsEditing(true);
    };

    const deleteItem = async () => {
        try {
            await axios.delete(`${URI}/budget/${_id}`, {
                params: {
                    token: authToken,
                },
            });
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
            await axios.put(`${URI}/budget/${_id}`, data, {
                params: {
                    token: authToken,
                },
            });
            toast.success("Operation edited correctly");
            getOperations();
            setIsEditing(false);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <li
            className={`${styles.budgetItem} ${type === "income" ? styles.success : styles.error
                } ${editable && styles["budgetItem--editable"]}`}
        >
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
                    <p
                        title={"The type is not editable"}
                        className={styles.text_capitalize}
                    >
                        {type}
                    </p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        className={styles.budgetItem__datepicker}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <div className={styles.budgetItem__save}>
                        <button onClick={updateItem} title="Save">
                            <FiSave />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p title="Concept">{concept}</p>
                    <p title="Amount">{amount}$</p>
                    <p className={styles.text_capitalize} title="Type">
                        {type}
                    </p>
                    <p title="Date">{format(new Date(date))}</p>
                    {editable && (
                        <div className={styles.budgetItem__options}>
                            <button onClick={() => editItem()} title="Edit">
                                <FiEdit />
                            </button>
                            <button onClick={() => deleteItem()} title="Delete">
                                <FiDelete />
                            </button>
                        </div>
                    )}
                </>
            )}
        </li>
    );
};

export default BudgetItem;
