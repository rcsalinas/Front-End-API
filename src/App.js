import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import MainNavigation from "./shared/components/MainNavigation";
import Footer from "./shared/components/Footer/Footer";
function App() {
	return (
		<>
			<MainNavigation />
			<Footer />
		</>
	);
}

export default App;
