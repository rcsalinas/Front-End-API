import React from "react";

import { database_Dummy } from "../util/sharedData";

import "./NotificacionesProfesor.css";

import { MDBBtn } from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";

let contrataciones = database_Dummy.contrataciones_dummy;

const ContratacionesProfesor = () => {
	const handleAceptar = (c) => {
		console.log("aceptar");
	};
	const handleCancelar = (c) => {
		console.log("rechazar");
	};

	return (
		<div className="cuerpo">
			<h1 className="fw-bold">Contrataciones Pendientes de Aprobacion:</h1>
			{contrataciones.map((c) => {
				return (
					<div className="comentario">
						<h2>Curso: {c.curso}</h2>
						<h4>Motivo de solicitud</h4>
						<MDBTextArea value={c.motivacion} id="textAreaExample" rows={4} readOnly />
						<h4>Datos del Alumno</h4>
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
						<div className="botones">
							<MDBBtn
								outline
								rounded
								className="mx-2"
								color="success"
								onClick={() => handleAceptar(c)}
							>
								Aceptar
							</MDBBtn>
							<MDBBtn
								outline
								rounded
								className="mx-2"
								color="danger"
								onClick={() => handleCancelar(c)}
							>
								Rechazar
							</MDBBtn>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ContratacionesProfesor;
