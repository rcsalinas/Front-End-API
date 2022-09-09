import React from "react";

import CursoCard from "./CursoCard/CursoCard";
import "./Cursos.css";

const Cursos = (props) => {
	const { cursos, misCursos } = props;
	return (
		<div className="cursos-buscados">
			{misCursos &&
				cursos.map((curso) => (
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
				))}
			{!misCursos &&
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
