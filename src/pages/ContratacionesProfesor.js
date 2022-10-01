import React from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import "./NotificacionesProfesor.css";

import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdb-react-ui-kit";

import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const ContratacionesProfesor = () => {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	const {
		data: contrataciones,
		error: errContrataciones,
		isError: isErrContrataciones,
		isLoading: isLoadingContrataciones,
	} = useQuery(["contrataciones", auth.userId], fetchContrataciones, {});

	const {
		mutate: acceptContratacion,
		isLoading: isLoadingCambiarContratacion,
		isSuccess: isSuccessCambiarContratacion,
	} = useMutation(aceptarContratacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});
	const {
		mutate: rejectContratacion,
		isLoading: isLoadingReject,
		isSuccess: isSuccessReject,
	} = useMutation(rechazarContratacion, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});

	async function fetchContrataciones() {
		const { data } = await axios.get(
			`http://localhost:8000/contrataciones?profesor=${auth.userId}`
		);

		return data;
	}

	async function aceptarContratacion(id) {
		const { data } = await axios.patch(`http://localhost:8000/contrataciones/${id}`, {
			estadoContratacion: true,
		});
		return data;
	}
	async function rechazarContratacion(id) {
		const { data } = await axios.delete(`http://localhost:8000/contrataciones/${id}`);
		return data;
	}

	const handleAceptar = (id) => {
		acceptContratacion(id);
	};
	const handleCancelar = (id) => {
		rejectContratacion(id);
	};

	if (isLoadingContrataciones || isLoadingCambiarContratacion || isLoadingReject) {
		return <LoadingSpinner />;
	}
	if (isErrContrataciones) {
		return <div>Error! {errContrataciones.message}</div>;
	}

	return (
		<>
			<MDBCard
				shadow="0"
				border="light"
				background="white"
				className="mb-3"
				style={{ margin: "2% 2% 2% 2%" }}
			>
				<MDBCardHeader>Contrataciones Pendientes de Aprobacion</MDBCardHeader>
				<MDBCardBody>
					<MDBTable align="middle" responsive>
						{(isLoadingContrataciones ||
							isLoadingCambiarContratacion ||
							isLoadingReject) && <LoadingSpinner asOverlay />}
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
								if (!c.estadoContratacion) {
									return (
										<tr>
											<td>
												<div className="d-flex align-items-center">
													<img
														src="https://mdbootstrap.com/img/new/avatars/8.jpg"
														alt=""
														style={{ width: "45px", height: "45px" }}
														className="rounded-circle"
													/>
													<div className="ms-3">
														<p className="fw-bold mb-1">{c.alumno}</p>
														<p className="text-muted mb-0">{c.mail}</p>
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
											<td>{c.curso}</td>
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
														onClick={() => handleCancelar(c.id)}
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
		</>
	);
};

export default ContratacionesProfesor;
