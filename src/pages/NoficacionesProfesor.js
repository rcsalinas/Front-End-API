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

import "./NotificacionesProfesor.css";

let comentarios = database_Dummy.comentarios_dummy;
let notificaciones = database_Dummy.notificaciones_dummy;

const NotificacionesProfesor = () => {
	const auth = useContext(AuthContext);
	const [comentariosDisplay, setComentariosDisplay] = React.useState([]);
	const [basicModal, setBasicModal] = React.useState(false);
	const [mensajeBorrado, setMensajeBorrado] = React.useState("");
	const [comentario, setComentario] = React.useState("");
	const [notis, setNotisDisplay] = React.useState("");

	React.useEffect(() => {
		setComentariosDisplay(comentarios);
		setNotisDisplay(notificaciones);
	}, []);

	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}

	const handleAprobar = (elemento) => {
		elemento.estado = true;

		let prev = comentariosDisplay.filter((comentario) => {
			return comentario.id !== elemento.id;
		});

		setComentariosDisplay(prev);
	};

	const toggleShow = (c) => {
		setBasicModal(!basicModal);
		setComentario(c);
	};

	const handleBorrarNotificacion = (not) => {
		let prev = notis.filter((n) => {
			return n.id !== not.id;
		});

		setNotisDisplay(prev);

		notificaciones = notificaciones.filter((c) => {
			return c.id !== not.id;
		});
	};

	const handleBorrar = () => {
		notificaciones.push({
			id: `${notificaciones.length + 1}`,
			mensaje: mensajeBorrado,
			alumno: `${comentario.alumno}`,
			curso: `${comentario.curso}`,
			contenidoComentario: `${comentario.contenido}`,
		});

		let prev = comentariosDisplay.filter((c) => {
			return c.id !== comentario.id;
		});

		setComentariosDisplay(prev);

		comentarios = comentarios.filter((c) => {
			return c.id !== comentario.id;
		});

		setBasicModal(!basicModal);
	};

	const handleMensajeBorradoChange = (event) => {
		setMensajeBorrado(event.target.value);
	};

	if (auth.userType === "profesor") {
		return (
			<div className="cuerpo">
				<MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
					<MDBModalDialog>
						<MDBModalContent>
							<MDBModalHeader>
								<MDBModalTitle>Modal title</MDBModalTitle>
							</MDBModalHeader>
							<MDBModalBody>
								<h6>Indique el motivo de borrado:</h6>
								<MDBTextArea
									label="Message"
									value={mensajeBorrado}
									onChange={handleMensajeBorradoChange}
									id="textAreaExample"
									rows={4}
								/>
							</MDBModalBody>

							<MDBModalFooter>
								<MDBBtn color="secondary" onClick={toggleShow}>
									Close
								</MDBBtn>
								<MDBBtn onClick={handleBorrar}>Save changes</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</MDBModal>
				<h1 className="fw-bold">Comentarios Pendientes de Aprobacion</h1>
				{comentariosDisplay.map((comentario) => {
					return (
						comentario.estado === false && (
							<div className="comentario">
								<h2>Curso: {comentario.curso}</h2>
								<h4>Estudiante: {comentario.alumno}</h4>
								<MDBTextArea
									value={comentario.contenido}
									id="textAreaExample"
									rows={4}
									readOnly
								/>
								<div className="botones">
									<MDBBtn
										outline
										rounded
										color="success"
										onClick={() => handleAprobar(comentario)}
									>
										Aprobar
									</MDBBtn>
									<MDBBtn
										outline
										rounded
										className="mx-2"
										color="danger"
										onClick={() => toggleShow(comentario)}
									>
										Borrar
									</MDBBtn>
								</div>
							</div>
						)
					);
				})}
			</div>
		);
	} else {
		return (
			<div className="cuerpo">
				<h1 className="fw-bold">Comentarios No Aprobados</h1>
				{notificaciones.map((n) => {
					return (
						<div className="comentario">
							<h2>Curso: {n.curso}</h2>
							<h4>Contenido Comentario</h4>
							<MDBTextArea
								value={n.contenidoComentario}
								id="textAreaExample"
								rows={4}
								readOnly
							/>
							<h4>Mensaje De Profesor:</h4>
							<MDBTextArea value={n.mensaje} id="textAreaExample" rows={4} readOnly />
							<div className="botones">
								<MDBBtn
									outline
									rounded
									className="mx-2"
									color="danger"
									onClick={() => handleBorrarNotificacion(n)}
								>
									Borrar
								</MDBBtn>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
};

export default NotificacionesProfesor;
