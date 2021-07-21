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

const URI = "http://localhost:4000/api";

export { Links, URI };
