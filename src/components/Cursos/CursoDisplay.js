import React, { useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import "./CursoDisplay.css";

import { useQueryClient, useMutation } from "react-query";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory, NavLink } from "react-router-dom";
import { MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { MDBTextArea } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Comentario from "../UIElements/Comentario";

import CloseIcon from "@mui/icons-material/Close";

import Rating from "@mui/material/Rating";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";

import * as api from "../../MiAppApi";

const CursoDisplay = (props) => {
	let navigate = useHistory();
	const queryClient = useQueryClient();
	const auth = useContext(AuthContext);
	const [value, setValue] = React.useState(0);
	const [display, setDisplay] = React.useState({});
	const [palabras, setPalabras] = useState("");
	const [open, setOpen] = React.useState(true);
	const [submitted, setSubmitted] = useState(false);

	const cursoId = useParams().cursoId;

	const {
		nombreCurso,
		idCurso,
		idProfesor,
		image,
		estadoContratacion,
		rating,
		descripcion,
		nombreProfesor,
		duracion,
		apellido,
		calificaciones,
	} = props;

	const {
		mutate: enviarComentario,
		isLoading: isLoadingReview,
		error: errorSendComentarios,
		isError: isErrorSendComentario,
	} = useMutation(api.submitReview);

	const handleCommentChange = (event) => {
		setPalabras(event.target.value);
	};
	const handleReview = () => {
		setSubmitted(true);
		enviarComentario({
			alumno: `${auth.userId}`,
			curso: `${idCurso}`,
			comentario: palabras,
			rating: value,
			profesor: `${idProfesor}`,
		});
	};

	if (isLoadingReview) {
		return <LoadingSpinner asOverlay />;
	}

	return (
		<section style={{ padding: "2%" }}>
			{isErrorSendComentario && (
				<Box sx={{ width: "100%" }}>
					<Collapse in={open}>
						<Alert
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setOpen(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							sx={{ mb: 2 }}
							severity="error"
						>
							{errorSendComentarios.response.data.message}
						</Alert>
					</Collapse>
				</Box>
			)}
			<MDBCard className="mb-3" style={{ marginLeft: "10%", marginRight: "10%" }}>
				<MDBCardImage
					position="top"
					src={`http://localhost:5000/${image}`}
					alt="..."
					style={{ maxWidth: "500px", margin: "0 auto", maxHeight: "300px" }}
				/>
				<MDBCardBody>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<h3>{nombreCurso}</h3>
						<h5>Profesor: {nombreProfesor + " " + apellido}</h5>
						<MDBCardText>{descripcion}</MDBCardText>
						<MDBCardText>{duracion}</MDBCardText>
						<Typography component="legend" style={{ textAlign: "center" }}>
							Calificacion Promedio:
						</Typography>
						<Rating name="read-only" value={rating} readOnly />
					</div>
				</MDBCardBody>
			</MDBCard>

			<MDBCard className="mb-3" style={{ marginLeft: "10%", marginRight: "10%" }}>
				<Container>
					<Accordion defaultExpanded elevation={0}>
						<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
							<Typography color="primary" variant="h6" sx={{ fontWeight: 600 }}>
								Comentarios
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Grid container rowSpacing={2} sx={{ flexDirection: "column" }}>
								{calificaciones.map((review) => (
									<Comentario
										key={review.id}
										alumno={review.alumno}
										comentario={review.comentario}
										rating={review.rating}
										fecha={review.fecha}
									/>
								))}
							</Grid>
						</AccordionDetails>
					</Accordion>
				</Container>
			</MDBCard>
			<MDBCard className="mb-3" style={{ marginLeft: "10%", marginRight: "10%" }}>
				{auth.isLoggedIn &&
					!submitted &&
					auth.userType === "estudiante" &&
					(estadoContratacion.estadoContratacion === "Aceptada" ||
						estadoContratacion.estadoContratacion === "Finalizada") && (
						<div
							className="inputComentario"
							style={{
								marginLeft: "10%",
								marginRight: "40%",
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
								style={{
									width: "auto",
									marginBottom: "2%",
									marginTop: "2%",
									maxWidth: "100px",
								}}
								onClick={handleReview}
							>
								Submit
							</MDBBtn>
						</div>
					)}
			</MDBCard>

			<div className="botones">
				{!auth.isLoggedIn && (
					<Button
						variant="contained"
						onClick={() => {
							navigate.push("/auth");
						}}
						style={{ margin: "0 auto" }}
					>
						Autenticar Para solicitar
					</Button>
				)}
				{auth.isLoggedIn &&
					auth.userType === "estudiante" &&
					estadoContratacion.length === 0 && (
						<NavLink
							to={`/cursos/${idProfesor}/${idCurso}/ContratacionPage`}
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
		</section>
	);
};

export default CursoDisplay;
