import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { database_Dummy } from "../util/sharedData";
import CursoDisplay from "../components/Cursos/CursoDisplay";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
const cursos = database_Dummy.cursos_dummy;

const ratings = database_Dummy.calificaciones_dummy;

const CursoPage = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);
	const cursoId = useParams().cursoId;

	const [value, setValue] = React.useState(0);

	let encontrado = ratings.find((rating) => {
		// busco si ya comento una vez
		return rating.alumno === auth.userId && cursoId === rating.curso;
	});

	useEffect(() => {
		if (encontrado !== undefined) {
			//se encontro un rating del alumno para ese curso
			setValue(encontrado.valor);
		} else {
			setValue(0);
		}
	}, [encontrado]);

	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}
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
	const handleRatingChange = (event, newValue) => {
		setValue(newValue);

		console.log(encontrado);
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
	return (
		<CursoDisplay
			cursoEncontrado={cursoEncontrado}
			handleEliminar={handleEliminar}
			handleFinalizar={handleFinalizar}
			handleSolicitar={handleSolicitar}
			handleDespublicar={handleDespublicar}
			handlePublicar={handlePublicar}
			handleModificar={handleModificar}
			handleRatingChange={handleRatingChange}
			value={value}
			encontradoRating={encontrado}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
//aaaaaa
