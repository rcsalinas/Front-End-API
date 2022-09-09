import React from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import "./CursoDisplay.css";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";

const CursoDisplay = (props) => {
	let navigate = useHistory();
	const { cursoEncontrado, comentariosEncontrados, handleEliminar } = props;
	const auth = useContext(AuthContext);

	let estaEnCurso = cursoEncontrado.alumnos.includes(auth.userId);

	const handleFinalizar = () => {
		//cambia el estado de la contratacion correspondiente a finalizado
		console.log("finalizar");
	};
	const handleSolicitar = () => {
		//genera una contratacion en espera de aceptacion por parte del profesor
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

	return (
		<>
			<div className="contenedor">
				<div className="detallesCurso">
					<h1 className="fw-bold">{cursoEncontrado.nombreCurso}</h1>
					<h2>Profesor: {cursoEncontrado.profesor}</h2>
					<h4>Frecuencia: {cursoEncontrado.frecuencia}</h4>
					<h4>Tipo: {cursoEncontrado.tipo}</h4>
					<h4>Precio: ${cursoEncontrado.costo}</h4>
					<Typography component="legend">Descripcion del Curso:</Typography>
					<p className="fst-normal">{cursoEncontrado.desc}</p>
					<Typography component="legend">Calificacion Promedio:</Typography>
					<Rating name="read-only" value={cursoEncontrado.calificacion} readOnly />
				</div>
			</div>
			<div className="comentarios">
				<h2 className="fw-bold">Comentarios: </h2>
				{comentariosEncontrados.length !== 0 &&
					comentariosEncontrados.map((comentario) => {
						return <p key={comentario.id}>{comentario.contenido}</p>;
					})}
				{comentariosEncontrados.length === 0 && <h3>No hay comentarios para este curso</h3>}
			</div>

			{auth.isLoggedIn && estaEnCurso && auth.userType === "estudiante" && (
				<Button variant="contained" color="error" onClick={handleFinalizar}>
					Finalizar Curso
				</Button>
			)}
			{auth.isLoggedIn && !estaEnCurso && auth.userType === "estudiante" && (
				<Button variant="contained" color="success" onClick={handleSolicitar}>
					Solicitar Curso
				</Button>
			)}
			{!auth.isLoggedIn && (
				<Button
					variant="contained"
					onClick={() => {
						navigate.push("/auth");
					}}
				>
					Autenticar Para solicitar
				</Button>
			)}
			{auth.isLoggedIn && auth.userType === "profesor" && (
				<Stack direction="row" spacing={2}>
					<Button variant="contained" color="error" onClick={handleEliminar}>
						Eliminar
					</Button>
					{cursoEncontrado.estado && (
						<Button variant="outlined" onClick={handleDespublicar}>
							Despublicar
						</Button>
					)}
					{!cursoEncontrado.estado && (
						<Button variant="outlined" onClick={handlePublicar}>
							Publicar
						</Button>
					)}
					<Button variant="outlined" color="secondary">
						Modificar
					</Button>
				</Stack>
			)}
		</>
	);
};

export default CursoDisplay;
