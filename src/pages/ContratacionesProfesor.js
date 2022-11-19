import React, { useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./NotificacionesProfesor.css";
import { MDBCardText } from "mdb-react-ui-kit";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdb-react-ui-kit";

import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import * as api from "../MiAppApi";

const ContratacionesProfesor = () => {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [cId, setCId] = useState("");
	const [alu, setAlu] = useState("");
	const [auxCurso, setAuxCurso] = useState("");
	const {
		data: contrataciones,
		error: errContrataciones,
		isError: isErrContrataciones,
		isLoading: isLoadingContrataciones,
	} = useQuery(["contrataciones", auth.userId], api.fetchContrataciones, {});

	const {
		mutate: acceptContratacion,
		isLoading: isLoadingAcceptContratacion,
		isError: isErrorAcceptContratacion,
		error: errorAcceptContratacion,
	} = useMutation(api.aceptarContratacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});
	const {
		mutate: rejectContratacion,
		isLoading: isLoadingReject,
		isError: isErrorReject,
		error: errorReject,
	} = useMutation(api.rechazarContratacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});

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

	const handleOpen = (id, alumno, curso) => {
		setAlu(alumno);
		setAuxCurso(curso);
		setOpen(true);
		setCId(id);
	};

	const handleRechazar = () => {
		rejectContratacion(cId);
		handleClose();
	};

	if (isLoadingContrataciones || isLoadingAcceptContratacion || isLoadingReject) {
		return <LoadingSpinner asOverlay />;
	}
	if (isErrContrataciones) {
		return <div>Error! {errContrataciones.response.data.message}</div>;
	}
	if (isErrorAcceptContratacion) {
		return <div>Error! {errorAcceptContratacion.response.data.message}</div>;
	}
	if (isErrorReject) {
		return <div>Error! {errorReject.response.data.message}</div>;
	}
	if (contrataciones.length > 0) {
		return (
			<section style={{ padding: "2%", height: "100vh" }}>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Seguro en rechazar contratacion?
						</Typography>

						<MDBBtn
							outline
							rounded
							className="mx-2"
							color="danger"
							onClick={handleRechazar}
							style={{ marginTop: "3%" }}
						>
							Rechazar
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
															src={`http://localhost:5000/${c.alumno.image}`}
															alt=""
															style={{
																width: "45px",
																height: "45px",
															}}
															className="rounded-circle"
														/>
														<div className="ms-3">
															<p className="fw-bold mb-1">
																{c.alumno.nombre}
															</p>
															<p className="text-muted mb-0">
																{c.email}
															</p>
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
	} else {
		return (
			<section style={{ padding: "2%", height: "100vh" }}>
				<MDBCard background="white" className="mb-3">
					<MDBCardHeader>Contrataciones</MDBCardHeader>
					<MDBCardBody>
						<MDBCardText>No tiene contrataciones pendientes de aprobacion</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</section>
		);
	}
};

export default ContratacionesProfesor;
