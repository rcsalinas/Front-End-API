import React, { useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import "./CursoDisplay.css";

import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory, NavLink } from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";

import Comentario from "../UIElements/Comentario";

import Rating from "@mui/material/Rating";

import { MDBTextArea } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import { maxWidth } from "@mui/system";

const CursoDisplay = (props) => {
	let navigate = useHistory();
	const queryClient = useQueryClient();
	const auth = useContext(AuthContext);
	const [value, setValue] = React.useState(0);
	const [display, setDisplay] = React.useState({});
	const [palabras, setPalabras] = useState("");
	const cursoId = useParams().cursoId;
	const { cursoEncontrado, contratacion } = props;

	const {
		data: comentarios,
		error: errorComentarios,
		isError: isErrorComentarios,
		isLoading: isLoadingComentarios,
	} = useQuery(["comentarios", cursoId], fetchComentarios);

	async function fetchComentarios() {
		const { data } = await axios.get(`http://localhost:8000/calificaciones?curso=${cursoId}`);
		return data;
	}

	const { mutate: enviarComentario, isLoading: isLoadingReview } = useMutation(submitReview);

	async function submitReview(payload) {
		const { data } = await axios.post(`http://localhost:8000/calificaciones`, payload);
		return data;
	}

	const { mutate: eliminarCurso, isLoading: isLoadingEliminar } = useMutation(deleteCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos"]);
			queryClient.invalidateQueries(["cursos", auth.userId]);
			if (contratacion.length === 0) {
				navigate.push(`/${auth.userId}/cursos`);
			} else {
				for (let i = 0; i < contratacion.length; i++) {
					queryClient.invalidateQueries(["cursos"], contratacion[i].alumno);
					eliminarContrataciones(contratacion[i].id);
				}
			}
		},
	});

	async function deleteCurso(payload) {
		const { data } = await axios.delete(`http://localhost:8000/cursos/${cursoId}`);
		return data;
	}

	const { mutate: eliminarContrataciones, isLoading: isLoadingEliminarContrataciones } =
		useMutation(deleteContrataciones, {
			onSuccess: () => {
				queryClient.invalidateQueries(["contrataciones"]);
				//queryClient.invalidateQueries(["cursos", auth.userId]);
				navigate.push(`/${auth.userId}/cursos`);
			},
		});

	async function deleteContrataciones(id) {
		const { data } = await axios.delete(`http://localhost:8000/contrataciones/${id}`);
		return data;
	}

	const { mutate: finalizarCurso, isLoading: isLoadingFinalizar } = useMutation(endCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
			queryClient.invalidateQueries(["curso", cursoId]);
			queryClient.invalidateQueries(["cursos", cursoId]);
		},
	});

	const { mutate: publicarCurso, isLoading: isLoadingPublicar } = useMutation(publishCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
			queryClient.invalidateQueries(["curso", cursoId]);
			queryClient.invalidateQueries(["cursos", cursoId]);
			//navigate.push(`/${auth.userId}/cursos`);
		},
	});

	async function publishCurso() {
		if (auth.userType === "estudiante") {
			const response = await axios.patch(
				`http://localhost:8000/contrataciones/${contratacion[0].id}`,
				{ estadoCurso: true }
			);
			return response;
		} else {
			let response;
			if (contratacion.length > 0) {
				response = await axios.patch(
					`http://localhost:8000/contrataciones/${contratacion[0].id}`,
					{ estadoCurso: true }
				);
			}

			const segundoAction = await axios.patch(`http://localhost:8000/cursos/${cursoId}`, {
				estado: true,
			});
			return [response, segundoAction];
		}
	}

	async function endCurso() {
		if (auth.userType === "estudiante") {
			const response = await axios.patch(
				`http://localhost:8000/contrataciones/${contratacion[0].id}`,
				{ estadoCurso: false }
			);
			return response;
		} else {
			let response;
			if (contratacion.length > 0) {
				response = await axios.patch(
					`http://localhost:8000/contrataciones/${contratacion[0].id}`,
					{ estadoCurso: false }
				);
			}

			const segundoAction = await axios.patch(`http://localhost:8000/cursos/${cursoId}`, {
				estado: false,
			});
			return [response, segundoAction];
		}
	}

	const handleCommentChange = (event) => {
		setPalabras(event.target.value);
	};
	const handleReview = () => {
		setDisplay({ display: "none" });
		let encontrado = comentarios.find((comment) => {
			return comment.alumno === auth.userId && comment.curso === cursoId;
		});
		if (!encontrado) {
			enviarComentario({
				alumno: `${auth.userId}`,
				curso: `${cursoEncontrado.id}`,
				comentario: palabras,
				rating: value,
				profesorCurso: `${cursoEncontrado.profesor}`,
				estado: false,
			});
		} else {
			alert("Usted tiene un comentario en espera o ya comento");
		}
	};

	const handleFinalizar = () => {
		finalizarCurso();
	};

	const handleEliminar = () => {
		eliminarCurso();
	};

	const handlePublicar = () => {
		publicarCurso();
	};

	if (
		isLoadingEliminar ||
		isLoadingEliminarContrataciones ||
		isLoadingFinalizar ||
		isLoadingReview ||
		isLoadingComentarios ||
		isLoadingPublicar
	) {
		return <LoadingSpinner />;
	}
	if (isErrorComentarios) {
		return <div>Error! {errorComentarios.message}</div>;
	}

	if (!auth.isLoggedIn) {
		return (
			<>
				<MDBCard
					className="mb-3"
					style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2%" }}
				>
					<MDBCardImage
						position="top"
						src={cursoEncontrado.image}
						alt="..."
						style={{ maxWidth: "500px", margin: "0 auto", maxHeight: "500px" }}
					/>
					<MDBCardBody>
						<h3>{cursoEncontrado.nombreCurso}</h3>
						<h5>Profesor: {cursoEncontrado.profesor}</h5>
						<MDBCardText>{cursoEncontrado.desc}</MDBCardText>
						<Typography component="legend">Calificacion Promedio:</Typography>
						<Rating name="read-only" value={cursoEncontrado.calificacion} readOnly />
					</MDBCardBody>
				</MDBCard>
				<div className="comentarios">
					<h4>Comentarios</h4>
					{comentarios.length > 0 &&
						comentarios.map((comment) => {
							if (comment.estado) {
								return (
									<Comentario
										contenido={comment.comentario}
										autor={comment.alumno}
										rating={comment.rating}
									/>
								);
							}
						})}
				</div>

				<div className="botones">
					<Button
						variant="contained"
						onClick={() => {
							navigate.push("/auth");
						}}
						style={{ margin: "0 auto" }}
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
				<MDBCard
					className="mb-3"
					style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2%" }}
				>
					<MDBCardImage
						position="top"
						src={cursoEncontrado.image}
						alt="..."
						style={{ maxWidth: "500px", margin: "0 auto", maxHeight: "500px" }}
					/>
					<MDBCardBody>
						<h3>{cursoEncontrado.nombreCurso}</h3>
						<h5>Profesor: {cursoEncontrado.profesor}</h5>
						<MDBCardText>{cursoEncontrado.desc}</MDBCardText>
						<Typography component="legend">Calificacion Promedio:</Typography>
						<Rating name="read-only" value={cursoEncontrado.calificacion} readOnly />
					</MDBCardBody>
				</MDBCard>

				<div className="comentarios">
					<h4>Comentarios</h4>
					{comentarios.length > 0 &&
						comentarios.map((comment) => {
							if (comment.estado) {
								return (
									<Comentario
										contenido={comment.comentario}
										autor={comment.alumno}
										rating={comment.rating}
									/>
								);
							}
						})}
				</div>

				{estaEnCurso &&
					contratacion[0].estadoContratacion &&
					auth.userType === "estudiante" && (
						<div
							className="inputComentario"
							style={{
								marginLeft: "10%",
								marginRight: "10%",
								marginTop: "2%",
								display: { display },
							}}
						>
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
					)}

				<div className="botones">
					{!contratacion[0].estadoContratacion && auth.userType === "estudiante" && (
						<h3>Espere respuesta del profesor</h3>
					)}
					{contratacion[0].estadoContratacion &&
						estaEnCurso &&
						contratacion[0].estadoCurso &&
						auth.userType === "estudiante" && (
							<Button variant="contained" color="error" onClick={handleFinalizar}>
								Finalizar Curso
							</Button>
						)}
					{!contratacion[0].estadoCurso && auth.userType === "estudiante" && (
						<h1>El curso finalizo!</h1>
					)}
					{auth.isLoggedIn && !estaEnCurso && auth.userType === "estudiante" && (
						<NavLink
							to={`/cursos/${cursoEncontrado.profesor}/${cursoEncontrado.id}/ContratacionPage`}
							style={{ textDecoration: "none" }}
						>
							<Button
								variant="contained"
								color="success"
								style={{ margin: "0 auto" }}
							>
								Solicitar Curso
							</Button>
						</NavLink>
					)}
				</div>
			</>
		);
	} else if (auth.isLoggedIn && contratacion.length === 0 && auth.userType === "estudiante") {
		return (
			<>
				<MDBCard
					className="mb-3"
					style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2%" }}
				>
					<MDBCardImage
						position="top"
						src={cursoEncontrado.image}
						alt="..."
						style={{ maxWidth: "500px", margin: "0 auto", maxHeight: "500px" }}
					/>
					<MDBCardBody>
						<h3>{cursoEncontrado.nombreCurso}</h3>
						<h5>Profesor: {cursoEncontrado.profesor}</h5>
						<MDBCardText>{cursoEncontrado.desc}</MDBCardText>
						<Typography component="legend">Calificacion Promedio:</Typography>
						<Rating name="read-only" value={cursoEncontrado.calificacion} readOnly />
					</MDBCardBody>
				</MDBCard>
				<div className="comentarios">
					<h4>Comentarios</h4>
					{comentarios.length > 0 &&
						comentarios.map((comment) => {
							if (comment.estado) {
								return (
									<Comentario
										contenido={comment.comentario}
										autor={comment.alumno}
										rating={comment.rating}
									/>
								);
							}
						})}
				</div>
				<div className="botones">
					<NavLink
						to={`/cursos/${cursoEncontrado.profesor}/${cursoEncontrado.id}/ContratacionPage`}
						style={{ textDecoration: "none" }}
					>
						<Button variant="contained" color="success" style={{ margin: "0 auto" }}>
							Solicitar Curso
						</Button>
					</NavLink>
				</div>
			</>
		);
	}
};

export default CursoDisplay;
