import React from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import CursoCard from "./CursoCard/CursoCard";
import "./Cursos.css";

const Cursos = (props) => {
	const auth = useContext(AuthContext);
	const { cursos, misCursos, aceptados, finalizados } = props;
	if (!misCursos) {
		return (
			<div className="cursos-buscados">
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
	} else {
		return (
			<div className="caja">
				{auth.userType === "estudiante" && (
					<>
						<h2>En curso:</h2>
						<div className="hijos">
							{aceptados.map((curso) => (
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
						</div>
						<h2>Finalizados:</h2>
						<div className="hijos">
							{finalizados.map((curso) => (
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
						</div>
					</>
				)}
				{misCursos && auth.userType === "profesor" && (
					<div className="hijos">
						{cursos.map((curso) => (
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
					</div>
				)}
			</div>
		);
	}
};

export default Cursos;
