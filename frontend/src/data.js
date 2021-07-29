import Budget from "./components/Budget";
import Operations from "./components/Operations";
import Login from "./components/Login";
import Register from "./components/Register";

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

const AuthLinks = [
	{
		name: "Login",
		path: "/login",
		component: Login,
	},
	{
		name: "Register",
		path: "/register",
		component: Register,
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

// const URI = "https://sheltered-plains-98989.herokuapp.com/api";
const URI = "https://sheltered-plains-98989.herokuapp.com/api";

export { Links, AuthLinks, URI, inputs };
