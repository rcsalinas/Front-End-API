import React from "react";

import CursoCard from "../CursoCard/CursoCard";
import "./Cursos.css";

const Cursos = (props) => {
	const { cursos } = props;
	return (
		<div className="cursos-buscados">
			{cursos.map((curso) => (
				<CursoCard
					key={curso.idCurso}
					id={curso.idCurso}
					title={curso.nombreCurso}
					image={curso.image}
					description={curso.desc}
					price={curso.costo}
					teacher={curso.profesor}
				/>
			))}
		</div>
	);
};

export default Cursos;
