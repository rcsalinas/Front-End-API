import React from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";

import { database_Dummy } from "../util/sharedData";
import {
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
} from "mdb-react-ui-kit";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import "./NotificacionesProfesor.css";

const NotificacionesProfesor = () => {
	const auth = useContext(AuthContext);

	const {
		data: notificaciones,
		error: errNotis,
		isError: isErrorNotis,
		isLoading: isLoadingNotis,
	} = useQuery(["contrataciones", auth.userId], fetchNotificaciones, {
		enabled: auth.userType === "estudiante",
	});

	const {
		data: comentarios,
		error: errComments,
		isError: isErrorComments,
		isLoading: isLoadingComments,
	} = useQuery(["comentarios", auth.userId], fetchComentarios, {
		enabled: auth.userType === "profesor",
	});

	async function fetchNotificaciones() {
		const { data } = await axios.get(
			`http://localhost:8000/notificaciones?alumno=${auth.userId}`
		);
		return data;
	}

	async function fetchComentarios() {
		const { data } = await axios.get(
			`http://localhost:8000/calificaciones?profesor=${auth.userId}`
		);
		return data;
	}

	const handleAprobar = (elemento) => {
		elemento.estado = true;
	};

	const handleBorrarNotificacion = (not) => {
		notificaciones = notificaciones.filter((c) => {
			return c.id !== not.id;
		});
	};

	const handleBorrar = () => {};

	const handleMensajeBorradoChange = (event) => {};

	if (isLoadingComments || isLoadingNotis) {
		return <LoadingSpinner />;
	}
	if (errNotis || errComments) {
		return <div>Error! {errComments ? errComments.message : errNotis}</div>;
	}

	if (auth.userType === "profesor") {
		return (
			<div className="cuerpo">
				<h1 className="fw-bold">Comentarios Pendientes de Aprobacion</h1>
				{comentarios.map((comentario) => {
					return (
						comentario.estado === false && (
							<MDBCard className="tarjeta">
								<MDBCardHeader tag="h2">Curso: {comentario.curso}</MDBCardHeader>

								<MDBCardBody>
									<MDBCardTitle>Estudiante: {comentario.alumno}</MDBCardTitle>

									<MDBTextArea
										value={comentario.comentario}
										id="textAreaExample"
										rows={4}
										readOnly
									/>
									<MDBBtn
										outline
										rounded
										color="success"
										onClick={() => handleAprobar(comentario)}
									>
										Aprobar
									</MDBBtn>
									<MDBBtn outline rounded className="mx-2" color="danger">
										Borrar
									</MDBBtn>
								</MDBCardBody>
							</MDBCard>
						)
					);
				})}
			</div>
		);
	} else {
		return (
			<div className="cuerpo">
				<h1 className="fw-bold" style={{ textAlign: "center" }}>
					Comentarios No Aprobados
				</h1>
				{notificaciones.map((n) => {
					return (
						<MDBCard className="tarjeta">
							<MDBCardHeader tag="h2">Curso: {n.curso}</MDBCardHeader>

							<MDBCardBody>
								<MDBCardTitle>Contenido Comentario:</MDBCardTitle>

								<MDBTextArea
									value={n.contenidoComentario}
									id="textAreaExample"
									rows={4}
									readOnly
								/>
								<MDBCardTitle>Mensaje del Profesor</MDBCardTitle>
								<MDBCardText>{n.mensaje}</MDBCardText>
								<MDBBtn
									outline
									rounded
									className="mx-2"
									color="danger"
									onClick={() => handleBorrarNotificacion(n)}
								>
									Borrar
								</MDBBtn>
							</MDBCardBody>
						</MDBCard>
					);
				})}
			</div>
		);
	}
};

export default NotificacionesProfesor;
