import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import MainNavigation from "./components/Navigation/MainNavigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
function App() {
	return (
		<>
			<MainNavigation />
			<Home />
			<Footer />
		</>
	);
}

export default App;
