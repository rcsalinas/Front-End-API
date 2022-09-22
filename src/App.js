import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import MainNavigation from "./components/Navigation/MainNavigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Auth from "./pages/Auth";
import ComoFunciona from "./pages/ComoFunciona";
import Profile from "./pages/Profile";
import NotificacionesProfesor from "./pages/NoficacionesProfesor";
import MisCursos from "./pages/MisCursos";
import UpdateUser from "./pages/UpdateUser";
import CursoPage from "./pages/CursoPage";
import UpdateCurso from "./pages/UpdateCurso";
import CreateCursoPage from "./pages/CreateCursoPage";
import ContratacionPage from "./pages/ContratacionPage";
import ContratacionesProfesor from "./pages/ContratacionesProfesor";

function App() {
	//const [isLoggedIn, setIsLoggedIn] = useState(false);
	//const [userType, setUserType] = useState(null); //cambiar a profesor para hacer pruebas con profesor
	//const [userId, setUserId] = useState(null);

	const { token, login, logout, userId, userType } = useAuth();

	/*const login = useCallback((tipo, usuario) => {
		setIsLoggedIn(true);
		setUserType(tipo);
		setUserId(usuario);
	}, []);
	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserType(null);
		setUserId(null);
	}, []);*/
	let routes;
	if (token) {
		if (userType === "estudiante") {
			routes = (
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/:userId/cursos" exact>
						<MisCursos />
					</Route>
					<Route path="/cursos/:cursoId/ContratacionPage" exact>
						<ContratacionPage />
					</Route>
					<Route path="/:userId/notificaciones" exact>
						<NotificacionesProfesor />
					</Route>
					<Route path="/users/:userId" exact>
						<UpdateUser />
					</Route>
					<Route path="/cursos/:cursoId" exact>
						<CursoPage />
					</Route>
					<Route path="/:userId/perfil" exact>
						<Profile />
					</Route>
					<Redirect to="/" />
				</Switch>
			);
		} else {
			routes = (
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/cursos/update/:cursoId" exact>
						<UpdateCurso />
					</Route>
					<Route path="/:userId/cursos" exact>
						<MisCursos />
					</Route>

					<Route path="/cursos/nuevo" exact>
						<CreateCursoPage />
					</Route>
					<Route path="/cursos/:cursoId/ContratacionPage" exact>
						<ContratacionPage />
					</Route>
					<Route path="/:userId/notificaciones" exact>
						<NotificacionesProfesor />
					</Route>

					<Route path="/:userId/contrataciones" exact>
						<ContratacionesProfesor />
					</Route>
					<Route path="/users/:userId" exact>
						<UpdateUser />
					</Route>

					<Route path="/cursos/:cursoId" exact>
						<CursoPage />
					</Route>
					<Route path="/:userId/perfil" exact>
						<Profile />
					</Route>
					<Redirect to="/" />
				</Switch>
			);
		}
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/comoFunciona" exact>
					<ComoFunciona />
				</Route>
				<Route path="/cursos/:cursoId" exact>
					<CursoPage />
				</Route>
				<Route path="/auth" exact>
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<>
			<AuthContext.Provider
				value={{
					userType: userType,
					isLoggedIn: !!token,
					token: token,
					userId: userId,
					login: login,
					logout: logout,
				}}
			>
				<Router>
					<MainNavigation />
					<main>{routes}</main>
					<Footer />
				</Router>
			</AuthContext.Provider>
		</>
	);
}

export default App;
