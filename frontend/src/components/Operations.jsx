import OperationForm from "./OperationForm";
import BudgetList from "./BudgetList";
import styles from "../css/Operations.module.css";
import { useEffect } from "react";
import { useOperationContext } from "../Context";
const Operations = () => {
	const { getOperations } = useOperationContext();
	useEffect(() => {
		getOperations();
	}, [getOperations]);
	return (
		<div className={styles.operations}>
			<OperationForm />
			<div className={styles.operations__header}>
				<h1>Operations List</h1>
				<BudgetList editable={true} />
			</div>
		</div>
	);
};

export default Operations;
