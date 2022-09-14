import React from "react";

import { database_Dummy } from "../util/sharedData";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Cursos from "../components/Cursos/Cursos";

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

	let aux = [];

	usuarioEncontrado[0].cursos.forEach((curso) => {
		let cursoId;
		cursoId = curso;

		aux.push(
			...cursos.filter((curso) => {
				return curso.idCurso === cursoId;
			})
		);
	});
	return (
		<>
			<h1 style={{ marginTop: "2%", marginBottom: "2%" }}>Cursos del usuario:</h1>
			<Cursos cursos={aux} misCursos={true} />
		</>
	);
};

export default MisCursos;
