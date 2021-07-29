import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthLinks, Links } from "./data";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AppProvider } from "./Context";

const App = () => {
	return (
		<Router>
			<AppProvider>
				<Navbar />
				<ToastContainer />
				<Switch>
					{Links.map((link, index) => {
						const { path, component } = link;
						return (
							<Route
								key={`${index}-link`}
								exact
								path={path}
								component={component}
							/>
						);
					})}
					{AuthLinks.map((link, index) => {
						const { path, component } = link;
						return (
							<Route
								key={`${index}-auth`}
								exact
								path={path}
								component={component}
							/>
						);
					})}
				</Switch>
			</AppProvider>
		</Router>
	);
};

export default App;
