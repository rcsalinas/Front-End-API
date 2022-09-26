import React, { useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import "./CursoDisplay.css";

import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory, NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";

import Rating from "@mui/material/Rating";

import { MDBTextArea } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { Card } from "@mui/material";

const CursoDisplay = (props) => {
	let navigate = useHistory();
	const queryClient = useQueryClient();
	const auth = useContext(AuthContext);
	const [value, setValue] = React.useState(0);
	const [display, setDisplay] = React.useState({});
	const [palabras, setPalabras] = useState("");
	const { cursoEncontrado, handleEliminar, handlePublicar, estadoCursoAlumno } = props;

	const { mutate, isLoading: isLoadingPost } = useMutation(submitReview, {
		onSuccess: (data) => {
			//queryClient.setQueryData(["calificacion", auth.userId], identifiedUser);
			//queryClient.invalidateQueries(["user", auth.userId]);
			//queryClient.invalidateQueries("cursos");
		},
	});

	async function submitReview(payload) {
		const { data } = await axios.post(`http://localhost:8000/calificaciones`, payload);
		return data;
	}

	async function updateEstadoCurso(payload) {
		const { data } = await axios.patch(`http://localhost:8000/users`, payload);
		return data;
	}

	let estaEnCurso = cursoEncontrado.alumnos.includes(auth.userId);

	const handleCommentChange = (event) => {
		setPalabras(event.target.value);
	};
	const handleReview = () => {
		setDisplay({ display: "none" });
		mutate({
			alumno: `${auth.userId}`,
			curso: `${cursoEncontrado.id}`,
			comentario: palabras,
			rating: value,
			profesorCurso: `${cursoEncontrado.profesor}`,
			estado: false,
		});
	};

	const handleFinalizar = () => {
		console.log("finalizar"); //requiere logica de mongoose
		navigate.push(`/${auth.userId}/cursos`);
	};
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

			{estaEnCurso && (
				<Card sx={display}>
					<div className="inputComentario">
						<MDBTextArea
							label="Comentario"
							id="textAreaExample"
							rows={4}
							columns={2}
							onChange={handleCommentChange}
							value={palabras}
						/>

						<Typography component="legend">Calificacion</Typography>
						<Rating
							name="simple-controlled"
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
						/>

						<MDBBtn
							rounded
							style={{ width: "20%", marginBottom: "2%", marginTop: "2%" }}
							onClick={handleReview}
						>
							Submit
						</MDBBtn>
					</div>
				</Card>
			)}

			<div className="botones">
				{auth.isLoggedIn &&
					estaEnCurso &&
					auth.userType === "estudiante" &&
					estadoCursoAlumno === "aceptado" && (
						<Button variant="contained" color="error" onClick={handleFinalizar}>
							Finalizar Curso
						</Button>
					)}
				{estadoCursoAlumno === "finalizado" && <h1>El curso finalizo!</h1>}
				{auth.isLoggedIn && !estaEnCurso && auth.userType === "estudiante" && (
					<NavLink
						to={`/cursos/${cursoEncontrado.profesor}/${cursoEncontrado.idCurso}/ContratacionPage`}
						style={{ textDecoration: "none" }}
					>
						<Button variant="contained" color="success">
							Solicitar Curso
						</Button>
					</NavLink>
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

				{auth.isLoggedIn &&
					auth.userType === "profesor" &&
					cursoEncontrado.profesor === auth.userId && (
						<Stack direction="row" spacing={2}>
							<Button variant="contained" color="error" onClick={handleEliminar}>
								Eliminar
							</Button>
							{cursoEncontrado.estado && (
								<Button variant="outlined" onClick={handleFinalizar}>
									Finalizar
								</Button>
							)}
							{!cursoEncontrado.estado && (
								<Button variant="outlined" onClick={handlePublicar}>
									Publicar
								</Button>
							)}
							<NavLink to={`/cursos/update/${cursoEncontrado.idCurso}`}>
								<Button variant="outlined" color="secondary">
									Modificar
								</Button>
							</NavLink>
						</Stack>
					)}
			</div>
		</>
	);
};

export default CursoDisplay;
