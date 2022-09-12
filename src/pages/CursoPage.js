import React from "react";
import { useParams } from "react-router-dom";

import { database_Dummy } from "../util/sharedData";
import CursoDisplay from "../components/Cursos/CursoDisplay";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
const cursos = database_Dummy.cursos_dummy;
const comentarios = database_Dummy.comentarios_dummy;

const CursoPage = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);
	const cursoId = useParams().cursoId;
	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}
	let cursoEncontrado = cursos.find((curso) => {
		return curso.idCurso === cursoId;
	});

	let comentariosEncontrados = comentarios.filter((comment) => {
		return comment.curso === cursoId;
	});

	const handleEliminar = () => {
		let indice = cursos.findIndex((curso) => {
			return curso.idCurso === cursoId;
		});
		cursos.splice(indice, 1);
		console.log(cursos);
		navigate.push(`/${auth.userId}/cursos`);
	};

	return (
		<CursoDisplay
			cursoEncontrado={cursoEncontrado}
			comentariosEncontrados={comentariosEncontrados}
			handleEliminar={handleEliminar}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
