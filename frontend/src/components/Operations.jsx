import OperationForm from "./OperationForm";
import BudgetLIst from "./BudgetLIst";
const Operations = () => {
	return (
		<>
			<h1>Add a operation</h1>
			<OperationForm />
			<h1>Operations List</h1>
			<BudgetLIst editable={true} />
		</>
	);
};

export default Operations;
