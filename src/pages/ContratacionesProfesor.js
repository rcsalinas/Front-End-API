import React from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import "./NotificacionesProfesor.css";

import { MDBBtn } from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";

import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";

import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
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
		console.log(data);
		return data;
	}

	async function aceptarContratacion(id) {
		const { data } = await axios.patch(`http://localhost:8000/contrataciones/${id}`, {
			estadoContratacion: true,
		});
		return data;
	}
	async function rechazarContratacion(id) {
		const { data } = await axios.delete(`http://localhost:8000/contrataciones/${id}`, {
			estadoContratacion: true,
		});
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
		<div className="cuerpo">
			<h1 className="fw-bold">Contrataciones Pendientes de Aprobacion:</h1>

			{contrataciones.map((c) => {
				if (!c.estadoContratacion) {
					return (
						<MDBCard>
							<MDBCardHeader tag="h2">Curso: {c.curso}</MDBCardHeader>

							<MDBCardBody>
								<MDBCardTitle>Motivo de solicitud</MDBCardTitle>
								<MDBCardText>{c.motivacion}</MDBCardText>
								<MDBCardTitle>Datos del alumno:</MDBCardTitle>
								<MDBTextArea
									value={
										"Email: " +
										c.mail +
										"\nTelefono: " +
										c.telefono +
										"\nHorario de Preferencia: " +
										c.horario
									}
									id="textAreaExample"
									rows={4}
									readOnly
								/>

								<MDBBtn
									outline
									rounded
									className="mx-2"
									color="success"
									onClick={() => handleAceptar(c.id)}
								>
									Aceptar
								</MDBBtn>
								<MDBBtn
									outline
									rounded
									className="mx-2"
									color="danger"
									onClick={() => handleCancelar(c.id)}
								>
									Rechazar
								</MDBBtn>
							</MDBCardBody>
						</MDBCard>
					);
				}
			})}
		</div>
	);
};

export default ContratacionesProfesor;
