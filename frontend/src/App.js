import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Links } from "./data";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { OperationProvider } from "./Context";

const App = () => {
	return (
		<Router>
			<Navbar />
			<ToastContainer />
			<OperationProvider>
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
			</OperationProvider>
		</Router>
	);
};

export default App;
