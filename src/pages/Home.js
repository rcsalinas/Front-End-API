import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";

import ComoFunciona from "../components/ComoFunciona/ComoFunciona";
import BuscadorCursos from "../components/Cursos/BuscadorCursos";

const mainFeaturedPost = {
	title: "Teachers Market",
	description: "Teachers Market es una pagina donde puedes encontrar profesores particulares.",
	image: "https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg?w=2000",
	imageText: "imagen",
	linkText: "Conocer como funciona...",
};

const Home = () => {
	const auth = useContext(AuthContext);
	return (
		<>
			<ComoFunciona post={mainFeaturedPost} />
			<h2>Cursos: {auth.userType}</h2>
			<BuscadorCursos />
		</>
	);
};

export default Home;
