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
	const { cursoEncontrado, contratacion } = props;

	const { mutate: enviarComentario, isLoading: isLoadingReview } = useMutation(submitReview);

	async function submitReview(payload) {
		const { data } = await axios.post(`http://localhost:8000/calificaciones`, payload);
		return data;
	}

	const { mutate: eliminarCurso, isLoading: isLoadingEliminar } = useMutation(deleteCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos"]);
			queryClient.invalidateQueries(["cursos", auth.userId]);
			if (contratacion.length == 0) {
				navigate.push(`/${auth.userId}/cursos`);
			}
			for (let i = 0; i < contratacion.length; i++) {
				queryClient.invalidateQueries(["cursos"], contratacion[i].alumno);
				eliminarContrataciones(contratacion[i].id);
			}
		},
	});

	async function deleteCurso(payload) {
		const { data } = await axios.delete(`http://localhost:8000/cursos/${cursoEncontrado.id}`);
		return data;
	}

	const { mutate: eliminarContrataciones, isLoading: isLoadingEliminarContrataciones } =
		useMutation(deleteContrataciones, {
			onSuccess: () => {
				//queryClient.invalidateQueries(["cursos"]);
				//queryClient.invalidateQueries(["cursos", auth.userId]);
				navigate.push(`/${auth.userId}/cursos`);
			},
		});

	async function deleteContrataciones(id) {
		const { data } = await axios.delete(`http://localhost:8000/contrataciones/${id}`);
		return data;
	}

	const handleCommentChange = (event) => {
		setPalabras(event.target.value);
	};
	const handleReview = () => {
		setDisplay({ display: "none" });
		enviarComentario({
			alumno: `${auth.userId}`,
			curso: `${cursoEncontrado.id}`,
			comentario: palabras,
			rating: value,
			profesorCurso: `${cursoEncontrado.profesor}`,
			estado: false,
		});
	};

	const handleFinalizar = () => {
		alert("no esta codeado aun");
	};

	const handleEliminar = () => {
		eliminarCurso();
	};

	const handlePublicar = () => {
		alert("no lo he codeado aun");
	};

	if (!auth.isLoggedIn) {
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
				<div className="botones">
					<Button
						variant="contained"
						onClick={() => {
							navigate.push("/auth");
						}}
					>
						Autenticar Para solicitar
					</Button>
				</div>
			</>
		);
	} else if (auth.isLoggedIn && contratacion.length > 0) {
		let estaEnCurso = contratacion.length > 0;
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

				{estaEnCurso &&
					contratacion[0].estadoContratacion &&
					auth.userType === "estudiante" && (
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
					{!contratacion[0].estadoContratacion && <h3>Espere respuesta del profesor</h3>}
					{estaEnCurso &&
						contratacion[0].estadoContratacion &&
						auth.userType === "estudiante" &&
						contratacion[0].estadoCurso && (
							<Button variant="contained" color="error" onClick={handleFinalizar}>
								Finalizar Curso
							</Button>
						)}
					{!contratacion[0].estadoCurso && <h1>El curso finalizo!</h1>}
					{auth.isLoggedIn && !estaEnCurso && auth.userType === "estudiante" && (
						<NavLink
							to={`/cursos/${cursoEncontrado.profesor}/${cursoEncontrado.id}/ContratacionPage`}
							style={{ textDecoration: "none" }}
						>
							<Button variant="contained" color="success">
								Solicitar Curso
							</Button>
						</NavLink>
					)}

					{auth.userType === "profesor" && cursoEncontrado.profesor === auth.userId && (
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
							<NavLink to={`/cursos/update/${cursoEncontrado.id}`}>
								<Button variant="outlined" color="secondary">
									Modificar
								</Button>
							</NavLink>
						</Stack>
					)}
				</div>
			</>
		);
	} else if (auth.isLoggedIn && contratacion.length === 0 && auth.userType === "estudiante") {
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
				<div className="botones">
					<NavLink
						to={`/cursos/${cursoEncontrado.profesor}/${cursoEncontrado.id}/ContratacionPage`}
						style={{ textDecoration: "none" }}
					>
						<Button variant="contained" color="success">
							Solicitar Curso
						</Button>
					</NavLink>
				</div>
			</>
		);
	} else if (auth.isLoggedIn && contratacion.length === 0 && auth.userType === "profesor") {
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

				<div className="botones">
					{auth.userType === "profesor" && cursoEncontrado.profesor === auth.userId && (
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
							<NavLink to={`/cursos/update/${cursoEncontrado.id}`}>
								<Button variant="outlined" color="secondary">
									Modificar
								</Button>
							</NavLink>
						</Stack>
					)}
				</div>
			</>
		);
	}
};

export default CursoDisplay;
