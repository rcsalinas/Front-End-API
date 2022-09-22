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

	const { data, error, isError, isLoading } = useQuery(["users", userId], fetchUser, {
		refetchOnMount: true,
		refetchOnWindowFocus: true,
	});

	async function fetchUser() {
		const { data } = await axios.get(`http://localhost:8000/users/${userId}`);
		return data;
	}

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <div>Error! {error.message}</div>;
	}
	return (
		<>
			<h1 style={{ marginTop: "2%" }}>
				Cursos del {auth.userType === "profesor" ? "Profesor" : "Estudiante"}:
			</h1>
			<div className="cursos-buscados">
				{data.cursos.map((curso) => {
					if (auth.userType === "estudiante") {
						return (
							<Auxiliar
								key={curso.curso}
								cursoId={curso.curso}
								cursoEstado={curso.estado}
							/>
						);
					} else {
						return <Auxiliar key={curso} cursoId={curso} />;
					}
				})}
			</div>

			{auth.isLoggedIn && auth.userType === "profesor" && (
				<NavLink to="/cursos/nuevo" style={{ textDecoration: "none" }}>
					<div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: "10%" }}>
						<MDBBtn>Crear Curso</MDBBtn>
					</div>
				</NavLink>
			)}
		</>
	);
};

export default MisCursos;
