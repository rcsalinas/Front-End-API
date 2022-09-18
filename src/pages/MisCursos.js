import React from "react";

import { database_Dummy } from "../util/sharedData";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Cursos from "../components/Cursos/Cursos";
import { MDBBtn } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

const cursos = database_Dummy.cursos_dummy;
const usuarios = database_Dummy.dummy_users;

const MisCursos = () => {
	const auth = useContext(AuthContext);
	const userId = useParams().userId;

	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}

	let usuarioEncontrado = usuarios.filter((user) => {
		return user.id === userId;
	});

	let aceptados = [];
	let finalizados = [];
	let aux = [];

	usuarioEncontrado[0].cursos.forEach((curso) => {
		let cursoId;
		if (auth.userType === "estudiante") {
			cursoId = curso.curso;
		} else {
			cursoId = curso;
		}
		if (auth.userType === "profesor") {
			aux.push(
				...cursos.filter((curso) => {
					return curso.idCurso === cursoId;
				})
			);
		} else {
			if (curso.estado === "aceptado") {
				aceptados.push(
					...cursos.filter((curso) => {
						return curso.idCurso === cursoId;
					})
				);
			} else {
				finalizados.push(
					...cursos.filter((curso) => {
						return curso.idCurso === cursoId;
					})
				);
			}
		}
	});

	return (
		<>
			<h1 style={{ marginTop: "2%" }}>
				Cursos del {auth.userType === "profesor" ? "Profesor" : "Estudiante"}:
			</h1>
			<Cursos cursos={aux} aceptados={aceptados} finalizados={finalizados} misCursos={true} />
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
