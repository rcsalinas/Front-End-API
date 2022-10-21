import React from "react";
import { useParams } from "react-router-dom";

import CursoDisplay from "../components/Cursos/CursoDisplay";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const CursoPage = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);
	const cursoId = useParams().cursoId;

	const {
		data: cursoEncontrado,
		error: errorFetchCurso,
		isError: isErrorFetchCurso,
		isLoading: isLoadingCurso,
	} = useQuery(["curso", cursoId], fetchCursoPorId); // me traigo el curso
	let estadoContratacion;

	const {
		data: contratacion,
		error: errorFetchContratacion,
		isError: isErrorFetchContratacion,
		isLoading: isLoadingContratacion,
	} = useQuery(["contrataciones", auth.userId], fetchContratacion, {
		enabled: auth.isLoggedIn && auth.userType === "estudiante",
	}); // me traigo la contratacion

	async function fetchCursoPorId() {
		const { data } = await axios.get(`http://localhost:5000/api/cursos/${cursoId}`);
		return data;
	}

	async function fetchContratacion() {
		const { data } = await axios.get(
			`http://localhost:5000/api/contrataciones/user/${auth.userId}`,
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);

		return data;
	}

	if (isErrorFetchCurso || isErrorFetchContratacion) {
		return <div>Ocurrio Error</div>;
	}

	if (isLoadingCurso || isLoadingContratacion) {
		return <LoadingSpinner asOverlay />;
	}
	if (auth.userType === "estudiante") {
		if (contratacion[0].curso.id === cursoEncontrado.id) {
			estadoContratacion = contratacion[0];
		} else {
			estadoContratacion = [];
		}
	} else {
		estadoContratacion = [];
	}

	return (
		<CursoDisplay
			nombreCurso={cursoEncontrado.nombre}
			idCurso={cursoEncontrado.id}
			idProfesor={cursoEncontrado.profesor.id}
			image={cursoEncontrado.image}
			estadoContratacion={estadoContratacion}
			rating={cursoEncontrado.rating}
			descripcion={cursoEncontrado.descripcion}
			nombreProfesor={cursoEncontrado.profesor.nombre}
			calificaciones={cursoEncontrado.calificaciones}
			duracion={cursoEncontrado.duracion}
			apellido={cursoEncontrado.profesor.apellido}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
//aaaaaa
