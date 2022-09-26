import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import BuscadorCursos from "../components/Cursos/BuscadorCursos";
import ComoFuncionaBanner from "../components/ComoFuncionaBanner/ComoFunciona";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import axios from "axios";
import { useQuery } from "react-query";

const mainFeaturedPost = {
	title: "Teachers Market",
	description: "Teachers Market es una pagina donde puedes encontrar profesores particulares.",
	image: "https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg?w=2000",
	imageText: "imagen",
	linkText: "Conocer como funciona...",
};

const Home = () => {
	const auth = useContext(AuthContext);
	const { data, error, isError, isLoading, isSuccess } = useQuery(["cursos"], fetchCursos, {
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});

	async function fetchCursos() {
		const { data } = await axios.get(`http://localhost:8000/cursos`);
		return data;
	}

	if (isLoading) {
	}
	if (isError) {
		return <div>Error! {error.message}</div>;
	}
	if (isSuccess) {
		return (
			<>
				<ComoFuncionaBanner post={mainFeaturedPost} />
				<h2>Cursos: </h2>
				<BuscadorCursos encontrados={data} />;
			</>
		);
	} else {
		return <LoadingSpinner />;
	}
};

export default Home;
