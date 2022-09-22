import React from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import CursoCard from "./CursoCard/CursoCard";
import "./Cursos.css";

import LoadingSpinner from "../UIElements/LoadingSpinner";

const Cursos = (props) => {
	const auth = useContext(AuthContext);
	const { cursos, misCursos, aceptados, finalizados, isLoading } = props;

	return (
		<div className="cursos-buscados">
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading &&
				!misCursos &&
				cursos.map(
					(curso) =>
						curso.estado && (
							<CursoCard
								key={curso.idCurso}
								id={curso.idCurso}
								title={curso.nombreCurso}
								image={curso.image}
								description={curso.desc}
								price={curso.costo}
								teacher={curso.profesor}
								rating={curso.calificacion}
							/>
						)
				)}
		</div>
	);
};

export default Cursos;
