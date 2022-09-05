import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useState, useCallback } from "react";

import MainNavigation from "./components/Navigation/MainNavigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { AuthContext } from "./context/auth-context";
import Auth from "./pages/Auth";
import ComoFunciona from "./pages/ComoFunciona";
import Profile from "./pages/Profile";
import Notificaciones from "./pages/Noficaciones";
import MisCursos from "./pages/MisCursos";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userType, setUserType] = useState(null); //cambiar a profesor para hacer pruebas con profesor
	const [userId, setUserId] = useState(null);

	const login = useCallback((tipo, usuario) => {
		setIsLoggedIn(true);
		setUserType(tipo);
		setUserId(usuario);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserType(null);
		setUserId(null);
	}, []);
	return (
		<>
			<AuthContext.Provider
				value={{
					isLoggedIn: isLoggedIn,
					userId: userId,
					userType: userType,
					login: login,
					logout: logout,
				}}
			>
				<Router>
					<MainNavigation />
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/:userId/perfil" exact>
							{/*Solo mando el user id, el condicional de que tipo es lo manejo adentro del componente*/}
							<Profile />
						</Route>
						<Route path="/:userId/cursos" exact>
							<MisCursos />
						</Route>
						<Route path="/:userId/notificaciones" exact>
							<Notificaciones />
						</Route>
						<Route path="/comoFunciona" exact>
							<ComoFunciona />
						</Route>
						<Route path="/users/:userId">
							<div>Update User</div>
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
