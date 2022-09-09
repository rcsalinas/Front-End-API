import React from "react";
import { useParams } from "react-router-dom";

import { database_Dummy } from "../util/sharedData";
import CursoDisplay from "../components/Cursos/CursoDisplay";
import { useHistory } from "react-router-dom";
const cursos = database_Dummy.cursos_dummy;
const comentarios = database_Dummy.comentarios_dummy;

const CursoPage = () => {
	let navigate = useHistory();
	const cursoId = useParams().cursoId;

	let cursoEncontrado = cursos.find((curso) => {
		return curso.idCurso === cursoId;
	});

	let comentariosEncontrados = comentarios.filter((comment) => {
		return comment.curso === cursoId;
	});

	const handleEliminar = () => {
		console.log("Eliminar");
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
