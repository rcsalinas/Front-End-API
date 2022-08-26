import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useState, useCallback } from "react";

import MainNavigation from "./components/Navigation/MainNavigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { AuthContext } from "./context/auth-context";
import Auth from "./pages/Auth";
import ComoFunciona from "./pages/ComoFunciona";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [userType, setUserType] = useState("estudiante"); //cambiar a profesor para hacer pruebas con profesor

	const login = useCallback((tipo) => {
		setIsLoggedIn(true);
		setUserType(tipo);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);
	return (
		<>
			<AuthContext.Provider
				value={{ isLoggedIn: isLoggedIn, userType: userType, login: login, logout: logout }}
			>
				<Router>
					<MainNavigation />
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/:userId/perfil" exact>
							{/*Solo mando el user id, el condicional de que tipo es lo manejo adentro del componente*/}
							<div>PERFIL del usuario</div>
						</Route>
						<Route path="/:userId/cursos" exact>
							<div>Cursos del ususario</div>
						</Route>
						<Route path="/quienesSomos" exact>
							<div>Quienes Somos</div>
						</Route>
						<Route path="/:userId/mensajeria" exact>
							<div>Mensajeria</div>
						</Route>
						<Route path="/:userId/notificaciones" exact>
							<div>Notificaciones</div>
						</Route>
						<Route path="/comoFunciona" exact>
							<ComoFunciona />
						</Route>

						<Route path="/auth" exact>
							<Auth />
						</Route>
						<Redirect to="/" />
					</Switch>
					<Footer />
				</Router>
			</AuthContext.Provider>
		</>
	);
}

export default App;
