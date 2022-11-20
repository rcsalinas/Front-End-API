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
	} = useQuery(
		["contratacion", auth.userId + cursoId],
		() => api.fetchContratacionPorCurso(cursoId),
		{
			enabled: auth.isLoggedIn && auth.userType === "estudiante",
		}
	); // me traigo la contratacion

	if (isLoadingCurso || isLoadingContratacion) {
		return <LoadingSpinner asOverlay />;
	}

	if (isErrorFetchContratacion) {
		return <div>{errorFetchContratacion.response.data.message}</div>;
	}
	if (isErrorFetchCurso) {
		return <div>{errorFetchCurso.response.data.message}</div>;
	}

	if (auth.userType === "estudiante" && contratacion) {
		estadoContratacion = contratacion.estadoContratacion;
	}
	console.log(estadoContratacion);
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
