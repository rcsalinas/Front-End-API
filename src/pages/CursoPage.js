import React from "react";
import { useParams } from "react-router-dom";

import CursoDisplay from "../components/Cursos/CursoDisplay";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import { useQuery } from "react-query";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import * as api from "../MiAppApi";

const CursoPage = () => {
	const auth = useContext(AuthContext);
	const cursoId = useParams().cursoId;

	const {
		data: cursoEncontrado,
		error: errorFetchCurso,
		isError: isErrorFetchCurso,
		isLoading: isLoadingCurso,
	} = useQuery(["curso", cursoId], () => api.fetchCursoPorId(cursoId)); // me traigo el curso
	let estadoContratacion;

	const {
		data: contratacion,
		error: errorFetchContratacion,
		isError: isErrorFetchContratacion,
		isLoading: isLoadingContratacion,
	} = useQuery(["contrataciones", auth.userId], api.fetchContrataciones, {
		enabled: auth.isLoggedIn && auth.userType === "estudiante",
	}); // me traigo la contratacion

	if (isLoadingCurso || isLoadingContratacion) {
		return <LoadingSpinner asOverlay />;
	}

	if (isErrorFetchCurso || isErrorFetchContratacion) {
		return <div>Ocurrio Error</div>;
	}

	if (auth.userType === "estudiante" && contratacion.length > 0) {
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
