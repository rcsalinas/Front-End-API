import React, { useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./NotificacionesProfesor.css";
import { MDBTextArea } from "mdb-react-ui-kit";
import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdb-react-ui-kit";

import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const ContratacionesProfesor = () => {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	const [motivoBorrado, setMotivoBorrado] = useState("");
	const [open, setOpen] = React.useState(false);
	const [cId, setCId] = useState("");
	const [alu, setAlu] = useState("");
	const [auxCurso, setAuxCurso] = useState("");
	const {
		data: contrataciones,
		error: errContrataciones,
		isError: isErrContrataciones,
		isLoading: isLoadingContrataciones,
	} = useQuery(["contrataciones", auth.userId], fetchContrataciones, {});

	const {
		mutate: acceptContratacion,
		isLoading: isLoadingAcceptContratacion,
		isError: isErrorAcceptContratacion,
		error: errorAcceptContratacion,
	} = useMutation(aceptarContratacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});
	const {
		mutate: rejectContratacion,
		isLoading: isLoadingReject,
		isError: isErrorReject,
		error: errorReject,
	} = useMutation(rechazarContratacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});

	const {
		mutate: enviarNotificacion,
		isLoading: isLoadingEnviar,
		isError: isErrorEnviar,
		error: errorEnviar,
	} = useMutation(sendNotificacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["notificaciones", alu]);
		},
	});

	async function sendNotificacion(payload) {
		const { data } = await axios.post(`http://localhost:5000/api/notificaciones`, payload, {
			headers: {
				Authorization: "Bearer " + auth.token,
			},
		});
		return data;
	}

	async function fetchContrataciones() {
		const { data } = await axios.get(
			`http://localhost:5000/api/contrataciones/user/${auth.userId}`,
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);

		return data;
	}

	async function aceptarContratacion(id) {
		const { data } = await axios.patch(
			`http://localhost:5000/api/contrataciones/${id}/aceptar`,
			{},
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);
		return data;
	}
	async function rechazarContratacion(id) {
		const { data } = await axios.delete(
			`http://localhost:5000/api/contrataciones/${id}/rechazar`,
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);
		return data;
	}

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

	const handleAceptar = (id) => {
		acceptContratacion(id);
	};
	const handleClose = () => setOpen(false);

	const handleMotivoChange = (event) => {
		setMotivoBorrado(event.target.value);
	};

	const handleOpen = (id) => {
		setOpen(true);
		setCId(id);
	};

	const handleRechazar = () => {
		enviarNotificacion({
			mensaje: `${motivoBorrado}`,
			alumno: `${alu}`,
			curso: `${auxCurso}`,
		});
		rejectContratacion(cId);
		handleClose();
	};

	if (isLoadingContrataciones || isLoadingAcceptContratacion || isLoadingReject) {
		return <LoadingSpinner asOverlay />;
	}
	if (isErrContrataciones) {
		return <div>Error! {errContrataciones.message}</div>;
	}
	if (isErrorAcceptContratacion) {
		return <div>Error! {errorAcceptContratacion.message}</div>;
	}
	if (isErrorReject) {
		return <div>Error! {errorReject.message}</div>;
	}

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
						style={{ marginTop: "3%" }}
					>
						Enviar Mensaje
					</MDBBtn>
				</Box>
			</Modal>

			<MDBCard>
				<MDBCardHeader>Contrataciones Pendientes de Aprobacion</MDBCardHeader>
				<MDBCardBody>
					<MDBTable align="middle" responsive>
						<MDBTableHead>
							<tr>
								<th scope="col">Nombre</th>
								<th scope="col">Motivo</th>
								<th scope="col">Datos</th>
								<th scope="col">Clase</th>
								<th scope="col">Actions</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody>
							{contrataciones.map((c) => {
								if (c.estadoContratacion === "Espera") {
									return (
										<tr>
											<td>
												<div className="d-flex align-items-center">
													<img
														src={c.alumno.image}
														alt=""
														style={{ width: "45px", height: "45px" }}
														className="rounded-circle"
													/>
													<div className="ms-3">
														<p className="fw-bold mb-1">
															{c.alumno.nombre}
														</p>
														<p className="text-muted mb-0">{c.email}</p>
													</div>
												</div>
											</td>
											<td>
												<p className="fw-normal mb-1">{c.motivacion}</p>
											</td>
											<td>
												<p className="text-muted mb-0">
													Telefono: {c.telefono}
												</p>
												<p className="text-muted mb-0">
													Horario preferido: {c.horario}
												</p>
											</td>
											<td>{c.curso.nombre}</td>
											<td>
												<div className="flex-row  flex-shrink-1 ">
													<MDBBtn
														color="success"
														onClick={() => handleAceptar(c.id)}
														style={{ marginRight: "1%" }}
													>
														Aceptar
													</MDBBtn>
													<MDBBtn
														color="danger"
														onClick={() =>
															handleOpen(
																c.id,
																c.alumno.id,
																c.curso.id
															)
														}
													>
														Rechazar
													</MDBBtn>
												</div>
											</td>
										</tr>
									);
								}
							})}
						</MDBTableBody>
					</MDBTable>
				</MDBCardBody>
			</MDBCard>
		</section>
	);
};

export default ContratacionesProfesor;
