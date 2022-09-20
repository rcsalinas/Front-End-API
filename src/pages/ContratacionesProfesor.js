import React from "react";

import { database_Dummy } from "../util/sharedData";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import "./NotificacionesProfesor.css";

import { MDBBtn } from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";
import { Redirect } from "react-router-dom";

import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { useEffect } from "react";

let contrataciones = database_Dummy.contrataciones_dummy;
let cursos = database_Dummy.cursos_dummy;
let usuarios = database_Dummy.dummy_users;

const ContratacionesProfesor = () => {
	const auth = useContext(AuthContext);
	const [contratacionesDisplay, setContratacionesDisplay] = React.useState([]);

	useEffect(() => {
		setContratacionesDisplay(contrataciones);
	}, []);

	if (!auth.isLoggedIn || auth.userType === "estudiante") {
		return <Redirect to="/auth" />;
	}

	const handleAceptar = (c) => {
		let curso = cursos.find((cur) => {
			return cur.idCurso === c.curso;
		});
		curso.alumnos.push(c.alumno);
		let alumno = usuarios.find((al) => {
			return al.id === c.alumno;
		});
		alumno.cursos.push({ curso: `${c.curso}`, estado: "aceptado" });

		let prev = contrataciones.filter((cont) => {
			return cont.id !== c.id;
		});
		setContratacionesDisplay(prev);
		contrataciones = contrataciones.filter((cont) => {
			return cont.id !== c.id;
		});

		console.log(alumno);
	};
	const handleCancelar = (c) => {
		let prev = contrataciones.filter((cont) => {
			return cont.id !== c.id;
		});
		setContratacionesDisplay(prev);
		contrataciones = contrataciones.filter((cont) => {
			return cont.id !== c.id;
		});
	};

	return (
		<div className="cuerpo">
			<h1 className="fw-bold">Contrataciones Pendientes de Aprobacion:</h1>

			{contratacionesDisplay.map((c) => {
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
						</MDBCardBody>
					</MDBCard>
				);
			})}
		</div>
	);
};

export default ContratacionesProfesor;
