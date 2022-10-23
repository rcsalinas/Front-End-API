import React from "react";

import CursoCard from "./CursoCard/CursoCard";
import "./Cursos.css";

import LoadingSpinner from "../UIElements/LoadingSpinner";

const Cursos = (props) => {
	const { cursos, misCursos, isLoading } = props;

	return (
		<div className="cursos-buscados">
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading &&
				!misCursos &&
				cursos.map(
					(curso) =>
						curso.estado && (
							<CursoCard
								key={curso.id}
								id={curso.id}
								title={curso.nombre}
								image={curso.image}
								description={curso.desc}
								price={curso.costo}
								teacher={curso.profesor.nombre + " " + curso.profesor.apellido}
								rating={curso.rating}
							/>
						)
				)}
		</div>
	);
};

export default Cursos;
