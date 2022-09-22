import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { database_Dummy } from "../util/sharedData";
import CursoDisplay from "../components/Cursos/CursoDisplay";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

const cursos = database_Dummy.cursos_dummy;
const ratings = database_Dummy.calificaciones_dummy;
const comentarios = database_Dummy.comentarios_dummy;
const usuarios = database_Dummy.dummy_users;

const CursoPage = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);
	const cursoId = useParams().cursoId;

	const [value, setValue] = React.useState(0);
	const [estadoCurso, setEstadoCurso] = React.useState(true);
	let user;
	let c;

	if (auth.userType === "estudiante") {
		user = usuarios.find((u) => {
			return u.id === auth.userId;
		});

		c = user.cursos.find((curso) => {
			return curso.curso === cursoId;
		});
	}

	let encontrado = ratings.find((rating) => {
		// busco si ya comento una vez
		return rating.alumno === auth.userId && cursoId === rating.curso;
	});

	let commentsEncontrados = comentarios.filter((comentario) => {
		return comentario.curso === cursoId && comentario.estado === true;
	});

	useEffect(() => {
		if (encontrado !== undefined) {
			//se encontro un rating del alumno para ese curso
			setValue(encontrado.valor);
		} else {
			setValue(0);
		}
		if (auth.userType === "estudiante" && c) {
			setEstadoCurso(c.estado);
		}
	}, [encontrado]);

	let cursoEncontrado = cursos.find((curso) => {
		return curso.idCurso === cursoId;
	}); //aqui voy a buscar en la db el curso

	const handleEliminar = () => {
		let indice = cursos.findIndex((curso) => {
			return curso.idCurso === cursoId;
		});
		cursos.splice(indice, 1);

		navigate.push(`/${auth.userId}/cursos`);
	}; //este va a ser un post con request a eleminar el curso
	const handleFinalizar = () => {
		//cambia el estado de la contratacion correspondiente a finalizado

		c.estado = false;
		setEstadoCurso(false);

		navigate.push(`/${auth.userId}/cursos`);
	};

	const handleDespublicar = (accion) => {
		cursoEncontrado.estado = false;
		navigate.push("/");
	};

	const handlePublicar = (accion) => {
		cursoEncontrado.estado = true;
		navigate.push("/");
	};

	const handleRatingChange = (event, newValue) => {
		setValue(newValue);

		if (encontrado !== undefined) {
			//si ya habia calificado modifico la calificacion
			encontrado.valor = newValue;
		} else {
			ratings.push({
				id: `rating${ratings.length + 1}`,
				alumno: `${auth.userId}`,
				curso: `${cursoId}`,
				valor: newValue,
			});
		}
	};
	const handleComentar = (texto) => {
		let existe = comentarios.find((comentario) => {
			// si ya existe el comentario
			return comentario.alumno === auth.userId && comentario.curso === cursoId;
		});
		if (existe) {
			alert("Solo puede comentar una vez");
		} else {
			comentarios.push({
				id: `${comentarios.length + 5}`,
				alumno: `${auth.userId}`,
				curso: `${cursoId}`,
				contenido: `${texto}`,
				estado: false, // primero lo tiene que aceptar el profesor para que se publique
			});
		}
	};
	return (
		<CursoDisplay
			cursoEncontrado={cursoEncontrado}
			handleEliminar={handleEliminar}
			handleFinalizar={handleFinalizar}
			handleDespublicar={handleDespublicar}
			handlePublicar={handlePublicar}
			handleRatingChange={handleRatingChange}
			value={value}
			encontradoRating={encontrado}
			comentarios={commentsEncontrados}
			handleComentar={handleComentar}
			estadoCurso={estadoCurso}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
//aaaaaa
