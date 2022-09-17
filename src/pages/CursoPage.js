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
	}); //aqui voy a buscar en la db el curso

	let comentariosEncontrados = comentarios.filter((comment) => {
		return comment.curso === cursoId;
	}); //en el mismo response van a venir los comentarios

	const handleEliminar = () => {
		let indice = cursos.findIndex((curso) => {
			return curso.idCurso === cursoId;
		});
		cursos.splice(indice, 1);
		console.log(cursos);
		navigate.push(`/${auth.userId}/cursos`);
	}; //este va a ser un post con request a eleminar el curso
	const handleFinalizar = () => {
		//cambia el estado de la contratacion correspondiente a finalizado
		console.log("finalizar");
	};
	const handleSolicitar = () => {
		//me tiene que llevar al formulario de contratacion
		console.log("solicitar");
	};
	const handleDespublicar = (accion) => {
		cursoEncontrado.estado = false;
		navigate.push("/");
	};

	const handlePublicar = (accion) => {
		cursoEncontrado.estado = true;
		navigate.push("/");
	};
	const handleModificar = (accion) => {
		navigate.push(`update/${cursoEncontrado.idCurso}`); //me lleva a la pagina modificar
	};
	return (
		<CursoDisplay
			cursoEncontrado={cursoEncontrado}
			comentariosEncontrados={comentariosEncontrados}
			handleEliminar={handleEliminar}
			handleFinalizar={handleFinalizar}
			handleSolicitar={handleSolicitar}
			handleDespublicar={handleDespublicar}
			handlePublicar={handlePublicar}
			handleModificar={handleModificar}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
//aaaaaa
