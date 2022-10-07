import React, { useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import { MDBTextArea } from "mdb-react-ui-kit";

import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdb-react-ui-kit";

import { Rating } from "@mui/material";

import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBCardText } from "mdb-react-ui-kit";

import "./NotificacionesProfesor.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const NotificacionesProfesor = () => {
	const auth = useContext(AuthContext);
	const [open, setOpen] = React.useState(false);
	const [motivoBorrado, setMotivoBorrado] = useState("");
	const [alu, setAlu] = useState("");
	const [auxCurso, setAuxCurso] = useState("");
	const [auxContenido, setAuxContenido] = useState("");
	const [auxId, setAuxId] = useState("");
	const queryClient = useQueryClient();

	const {
		data: notificaciones,
		error: errNotis,
		isLoading: isLoadingNotis,
		isError: isErrNotis,
	} = useQuery(["notificaciones", auth.userId], fetchNotificaciones, {
		enabled: auth.userType === "estudiante",
	});

	const {
		data: comentarios,
		error: errComments,
		isError: isErrComments,
		isLoading: isLoadingComments,
	} = useQuery(["comentarios", auth.userId], fetchComentarios, {
		enabled: auth.userType === "profesor",
	});
	const { mutate: enviarNotificacion, isLoading: isLoadingReject } = useMutation(
		sendNotificacion,
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["notificaciones", alu]);
			},
		}
	);

	const { mutate: borrarCalificacion, isLoading: isLoadingBorrandoCalificacion } = useMutation(
		deleteCalificacion,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["comentarios", auth.userId]);
			},
		}
	);

	const { mutate: acceptCalificacion, isLoading: isLoadingAcceptCalificacion } = useMutation(
		aprobarCalificacion,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["comentarios", auth.userId]);
			},
		}
	);
	const { mutate: borrarNotificacion, isLoading: isLoadingBorrarNotificacion } = useMutation(
		deleteNotificacion,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["notificaciones", auth.userId]);
			},
		}
	);
	async function sendNotificacion(payload) {
		const { data } = await axios.post(`http://localhost:8000/notificaciones`, payload);
		return data;
	}
	async function deleteNotificacion(id) {
		const { data } = await axios.delete(`http://localhost:8000/notificaciones/${id}`);
		return data;
	}

	async function aprobarCalificacion(id) {
		const { data } = await axios.patch(`http://localhost:8000/calificaciones/${id}`, {
			estado: true,
		});
		return data;
	}

	async function deleteCalificacion(idCalificacion) {
		const { data } = await axios.delete(
			`http://localhost:8000/calificaciones/${idCalificacion}`
		);
		return data;
	}

	async function fetchNotificaciones() {
		const { data } = await axios.get(
			`http://localhost:8000/notificaciones?alumno=${auth.userId}`
		);
		return data;
	}

	async function fetchComentarios() {
		const { data } = await axios.get(
			`http://localhost:8000/calificaciones?profesorCurso=${auth.userId}`
		);
		return data;
	}

	const handleOpen = (al, cur, mens, id) => {
		setOpen(true);
		setAlu(al);
		setAuxCurso(cur);
		setAuxContenido(mens);
		setAuxId(id);
	};
	const handleClose = () => setOpen(false);

	const handleMotivoChange = (event) => {
		setMotivoBorrado(event.target.value);
	};

	const handleAprobarComentario = (identidad) => {
		//setAuxId(id);

		acceptCalificacion(identidad);
	};

	const handleRechazar = () => {
		enviarNotificacion({
			mensaje: `${motivoBorrado}`,
			alumno: `${alu}`,
			curso: `${auxCurso}`,
			contenidoComentario: `${auxContenido}`,
		});
		borrarCalificacion(auxId);
		handleClose();
	};

	const handleBorrarNotificacion = (notId) => {
		borrarNotificacion(notId);
	};

	if (isErrNotis || isErrComments) {
		return <div>Error! {errComments ? errComments.message : errNotis}</div>;
	}
	if (
		isLoadingComments ||
		isLoadingNotis ||
		isLoadingAcceptCalificacion ||
		isLoadingBorrandoCalificacion ||
		isLoadingBorrarNotificacion ||
		isLoadingReject
	) {
		return <LoadingSpinner />;
	} else {
		if (auth.userType === "profesor") {
			if (comentarios.length > 0) {
				return (
					<section style={{ padding: "5%", height: "100vh" }}>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Indicar Motivo de Rechazo:
								</Typography>
								<MDBTextArea
									value={motivoBorrado}
									id="textAreaExample"
									rows={4}
									onChange={handleMotivoChange}
								/>
								<MDBBtn
									outline
									rounded
									className="mx-2"
									color="danger"
									onClick={handleRechazar}
								>
									Enviar Mensaje
								</MDBBtn>
							</Box>
						</Modal>

						<MDBCard>
							<MDBCardHeader>Calificaciones Pendientes de aprobacion</MDBCardHeader>
							<MDBCardBody>
								<MDBTable align="middle" responsive>
									<MDBTableHead>
										<tr>
											<th scope="col">Alumno</th>
											<th scope="col">Curso</th>
											<th scope="col">Comentario</th>
											<th scope="col">Rating</th>
											<th scope="col">Actions</th>
										</tr>
									</MDBTableHead>
									<MDBTableBody>
										{comentarios.map((comentario) => {
											return (
												comentario.estado === false && (
													<tr>
														<td>
															<div className="d-flex align-items-center">
																<img
																	src="https://mdbootstrap.com/img/new/avatars/8.jpg"
																	alt=""
																	style={{
																		width: "45px",
																		height: "45px",
																	}}
																	className="rounded-circle"
																/>
																<div className="ms-3">
																	<p className="fw-bold mb-1">
																		{comentario.alumno}
																	</p>
																</div>
															</div>
														</td>
														<td>
															<p className="fw-normal mb-1">
																{comentario.curso}
															</p>
														</td>
														<td>
															<p className="text-muted mb-0">
																{comentario.comentario}
															</p>
														</td>
														<td>
															<Rating
																name="read-only"
																value={comentario.rating}
																readOnly
															/>
														</td>
														<td>
															<div className="flex-row  flex-shrink-1 ">
																<MDBBtn
																	color="success"
																	onClick={() =>
																		handleAprobarComentario(
																			comentario.id
																		)
																	}
																	style={{ marginRight: "1%" }}
																>
																	Aceptar
																</MDBBtn>
																<MDBBtn
																	color="danger"
																	onClick={() =>
																		handleOpen(
																			comentario.alumno,
																			comentario.curso,
																			comentario.comentario,
																			comentario.id
																		)
																	}
																>
																	Rechazar
																</MDBBtn>
															</div>
														</td>
													</tr>
												)
											);
										})}
									</MDBTableBody>
								</MDBTable>
							</MDBCardBody>
						</MDBCard>
					</section>
				);
			} else {
				return (
					<MDBCard>
						<MDBCardHeader>Calificaciones</MDBCardHeader>
						<MDBCardBody>
							<MDBCardText>
								No tiene calificaciones pendientes de aprobacion
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				);
			}
		} else {
			if (notificaciones.length > 0) {
				return (
					<section style={{ padding: "5%", height: "100vh" }}>
						<MDBCard shadow="0" border="light" background="white" className="mb-3">
							<MDBCardHeader>Calificaciones no aprobadas</MDBCardHeader>
							<MDBCardBody>
								<MDBTable align="middle">
									<MDBTableHead>
										<tr>
											<th scope="col">Curso</th>
											<th scope="col">Contenido</th>

											<th scope="col">Motivo de Rechazo</th>

											<th scope="col">Action</th>
										</tr>
									</MDBTableHead>
									<MDBTableBody>
										{notificaciones.map((n) => {
											return (
												<tr>
													<td>
														<p className="fw-bold mb-1">{n.curso}</p>
													</td>
													<td>
														<p className="fw-normal mb-1">
															{n.contenidoComentario}
														</p>
													</td>
													<td>
														<p className="fw-normal mb-1">
															{n.mensaje}
														</p>
													</td>

													<td>
														<MDBBtn
															color="link"
															rounded
															size="sm"
															onClick={() =>
																handleBorrarNotificacion(n.id)
															}
														>
															Borrar
														</MDBBtn>
													</td>
												</tr>
											);
										})}
									</MDBTableBody>
								</MDBTable>
							</MDBCardBody>
						</MDBCard>
					</section>
				);
			} else {
				return (
					<section style={{ padding: "2%", height: "100vh" }}>
						<MDBCard
							background="white"
							className="mb-3"
							style={{ margin: "2% 2% 2% 2%" }}
						>
							<MDBCardHeader>Notificaciones</MDBCardHeader>
							<MDBCardBody>
								<MDBCardText>No tiene notificaciones</MDBCardText>
							</MDBCardBody>
						</MDBCard>
					</section>
				);
			}
		}
	}
};

export default NotificacionesProfesor;
