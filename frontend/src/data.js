import Budget from "./components/Budget";
import Operations from "./components/Operations";

const Links = [
	{
		name: "Home",
		path: "/",
		component: Budget,
	},
	{
		name: "Operations",
		path: "/operations",
		component: Operations,
	},
];

const inputs = [
	{
		name: "Concept",
		id: "concept",
		type: "text",
	},
	{
		name: "Amount",
		id: "amount",
		type: "number",
	},
];

const URI = "https://sheltered-plains-98989.herokuapp.com/api";

export { Links, URI, inputs };
