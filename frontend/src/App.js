import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Links } from "./data";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
	return (
		<Router>
			<Navbar />
			<ToastContainer />
			<Switch>
				{Links.map((link, index) => {
					const { path, component } = link;
					return (
						<Route
							key={index}
							exact
							path={path}
							component={component}
						/>
					);
				})}
			</Switch>
		</Router>
	);
};

export default App;
