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

	const {
		data: contratacion,
		error: errorFetchContratacion,
		isError: isErrorFetchContratacion,
		isLoading: isLoadingContratacion,
	} = useQuery(["contrataciones", auth.userId], fetchContratacion, { enabled: auth.isLoggedIn }); // me traigo la contratacion

	/*const {
		mutate:deleteCurso,
		isLoading: isLoadingDelete,
		isSuccess,
	} = useMutation(updateCurso, {
		onSuccess: (data) => {
			queryClient.setQueryData(["curso", cursoId], data);
			queryClient.invalidateQueries(["curso", cursoId]);
			queryClient.invalidateQueries(["cursos", cursoId]);
		},
	});*/

	async function fetchCursoPorId() {
		const { data } = await axios.get(`http://localhost:5000/api/cursos/${cursoId}`);
		return data;
	}

	async function fetchContratacion() {
		if (auth.userType === "estudiante") {
			const { data } = await axios.get(
				`http://localhost:8000/contrataciones?alumno=${auth.userId}&curso=${cursoId}`
			);
			return data;
		} else {
			const { data } = await axios.get(
				`http://localhost:8000/contrataciones?profesor=${auth.userId}&curso=${cursoId}`
			);
			return data;
		}
	}

	if (isErrorFetchCurso || isErrorFetchContratacion) {
		return (
			<div>
				Error!
				{isErrorFetchContratacion
					? errorFetchContratacion.message
					: errorFetchCurso.message}
			</div>
		);
	}

	if (isLoadingCurso || isLoadingContratacion) {
		return <LoadingSpinner />;
	}

	return (
		<CursoDisplay
			nombreCurso={cursoEncontrado.nombre}
			idCurso={cursoEncontrado.id}
			idProfesor={cursoEncontrado.profesor.id}
			image={cursoEncontrado.image}
			contratacion={contratacion}
			rating={cursoEncontrado.rating}
			descripcion={cursoEncontrado.descripcion}
			nombreProfesor={cursoEncontrado.profesor.nombre}
			calificaciones={cursoEncontrado.calificaciones}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
//aaaaaa
