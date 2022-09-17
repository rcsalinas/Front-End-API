import React from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import "./CursoDisplay.css";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";

import { Card } from "@mui/material";

const CursoDisplay = (props) => {
	let navigate = useHistory();
	const {
		cursoEncontrado,
		comentariosEncontrados,
		handleEliminar,
		handleFinalizar,
		handleSolicitar,
		handleDespublicar,
		handlePublicar,
		handleModificar,
	} = props;
	const auth = useContext(AuthContext);

	let estaEnCurso = cursoEncontrado.alumnos.includes(auth.userId); //me sirve para saber si esta en curso?

	return (
		<>
			<Card
				style={{ marginTop: "2%", marginLeft: "1%", marginRight: "1%" }}
				className="tarjeta"
			>
				<img
					className="imagen img-fluid rounded img-thumbnail"
					src={cursoEncontrado.image}
					alt=""
				/>
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
			</Card>

			<div className="comentarios">
				<h2 className="fw-bold">Comentarios: </h2>
				{comentariosEncontrados.length !== 0 &&
					comentariosEncontrados.map((comentario) => {
						return <p key={comentario.id}>{comentario.contenido}</p>;
					})}
				{comentariosEncontrados.length === 0 && <h3>No hay comentarios para este curso</h3>}
			</div>

			<div className="botones">
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
						<Button variant="outlined" color="secondary" onClick={handleModificar}>
							Modificar
						</Button>
					</Stack>
				)}
			</div>
		</>
	);
};

export default CursoDisplay;
