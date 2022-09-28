import React from "react";

import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import { MDBBtn } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Auxiliar from "../components/Auxiliar";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import "../components/Cursos/Cursos.css";

const MisCursos = () => {
	const auth = useContext(AuthContext);
	const userId = useParams().userId;

	const {
		data: cursosProfe,
		error: errorCursosProfe,
		isError: isErrorCursosProfe,
		isLoading: isLoadingCursosProfe,
	} = useQuery(["cursos", auth.userId], fetchCursosProfesor, {
		enabled: auth.userType === "profesor",
	});

	const {
		data: cursosEstudiante,
		error: errorCursosEstudiante,
		isError: isErrorCursosEstudiante,
		isLoading: isLoadingCursosEstudiante,
	} = useQuery(["contrataciones", auth.userId], fetchCursosEstudiante, {
		enabled: auth.userType === "estudiante",
	});

	async function fetchCursosProfesor() {
		const { data } = await axios.get(`http://localhost:8000/cursos?profesor=${userId}`);
		return data;
	}
	async function fetchCursosEstudiante() {
		const { data } = await axios.get(`http://localhost:8000/contrataciones?alumno=${userId}`);
		console.log(data);
		return data;
	}

	if (isLoadingCursosProfe) {
		return <LoadingSpinner />;
	}
	if (isErrorCursosProfe) {
		return <div>Error! {errorCursosProfe.message}</div>;
	}
	if (isLoadingCursosEstudiante) {
		return <LoadingSpinner />;
	}
	if (isErrorCursosEstudiante) {
		return <div>Error! {errorCursosEstudiante.message}</div>;
	}

	if (auth.userType === "profesor") {
		return (
			<>
				<h1 style={{ marginTop: "2%" }}>Cursos del Profesor:</h1>
				<div className="cursos-buscados">
					{cursosProfe.map((curso) => {
						return <Auxiliar key={curso.id} cursoId={curso.id} />;
					})}
				</div>

				<NavLink to="/cursos/nuevo" style={{ textDecoration: "none", marginBottom: "5%" }}>
					<div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: "5%" }}>
						<MDBBtn>Crear Curso</MDBBtn>
					</div>
				</NavLink>
			</>
		);
	}

	return (
		<>
			<h1 style={{ marginTop: "2%" }}>Cursos del Estudiante:</h1>
			<h3>En curso:</h3>
			<div className="cursos-buscados">
				{cursosEstudiante.map((curso) => {
					if (curso.estadoContratacion && curso.estadoCurso) {
						return <Auxiliar key={curso.curso} cursoId={curso.curso} />;
					}
				})}
			</div>
			<h3>Finalizados:</h3>
			<div className="cursos-buscados" style={{ textDecoration: "none", marginBottom: "7%" }}>
				{cursosEstudiante.map((curso) => {
					if (curso.estadoContratacion && !curso.estadoCurso) {
						return <Auxiliar key={curso.curso} cursoId={curso.curso} />;
					}
				})}
			</div>
		</>
	);
};

export default MisCursos;
