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

	const [estadoCurso, setEstadoCurso] = React.useState("");

	const {
		data: cursoEncontrado,
		error: errorFetchCurso,
		isError: isErrorFetchCurso,
		isLoading: isLoadingCurso,
	} = useQuery(["curso", cursoId], fetchCursoPorId); // me traigo el curso

	const {
		data: usuarioEncontrado,
		error: errorFetchUsuario,
		isErrorFetchUsuario,
		isLoading: isLoadingUser,
	} = useQuery(["user", auth.userId], fetchUser, {
		enabled: auth.isLoggedIn && auth.userType === "estudiante",
		onSuccess: (usuarioEncontrado) => {
			let cursoUsuario = usuarioEncontrado.cursos.find((c) => {
				return c.curso === cursoId;
			});
			setEstadoCurso(cursoUsuario.estado);
		},
	});

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
		const { data } = await axios.get(`http://localhost:8000/cursos/${cursoId}`);
		return data;
	}

	async function fetchUser() {
		const { data } = await axios.get(`http://localhost:8000/users/${auth.userId}`);

		return data;
	}

	const handleEliminar = () => {
		//requiere logica de mongoose porque al eliminaree deberia de eliminarse la referencia en el usuario tambien
		navigate.push(`/${auth.userId}/cursos`);
	}; //este va a ser un post con request a eleminar el curso

	const handlePublicar = (accion) => {
		//requiere logica de mongoose ya que es la accion inversa de finalizar es cambiarle el estado en alumno y curso
		navigate.push("/");
	};

	if (isErrorFetchCurso || isErrorFetchUsuario) {
		return (
			<div>
				Error! {isErrorFetchUsuario ? errorFetchUsuario.message : errorFetchCurso.message}
			</div>
		);
	}

	//aqui voy a traer el usuario segun el id y le paso los datos a el componente

	if (isLoadingUser || isLoadingCurso) {
		return <LoadingSpinner />;
	}

	return (
		<CursoDisplay
			cursoEncontrado={cursoEncontrado}
			handleEliminar={handleEliminar}
			handlePublicar={handlePublicar}
			estadoCursoAlumno={estadoCurso}
		/>
	);
};
//Producto y comentarios
export default CursoPage;
//aaaaaa
