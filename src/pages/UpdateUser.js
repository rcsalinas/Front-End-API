import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Redirect, useHistory } from "react-router-dom";

import { database_Dummy } from "../util/sharedData";

import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBTextArea,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useEffect } from "react";

const dummy_users = database_Dummy.dummy_users;

const UpdateUser = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [mail, setMail] = useState("");
	const [telefono, setTelefono] = useState("");
	const [fechaNacimiento, setFechaNacimiento] = useState("");
	const [estudiosCursados, setEstudiosCursados] = useState("");
	const [experiencia, setExperiencia] = useState("");
	const [titulo, setTitulo] = useState("");

	let identifiedUser;
	identifiedUser = dummy_users.find((u) => u.mail === auth.userId);

	useEffect(() => {
		setNombre(identifiedUser.nombre);
		setApellido(identifiedUser.apellido);
		setMail(identifiedUser.mail);
		setTelefono(identifiedUser.celular);
		if (auth.userType === "estudiante") {
			setFechaNacimiento(identifiedUser.fechaNacimiento);
			setEstudiosCursados(identifiedUser.estudiosCursados);
		} else {
			setExperiencia(identifiedUser.experiencia);
			setTitulo(identifiedUser.titulo);
		}
	}, [
		auth.userType,
		identifiedUser.experiencia,
		identifiedUser.apellido,
		identifiedUser.nombre,
		identifiedUser.celular,
		identifiedUser.mail,
		identifiedUser.estudiosCursados,
		identifiedUser.fechaNacimiento,
		identifiedUser.titulo,
	]);

	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}

	const handleNameChange = (event) => {
		setNombre(event.target.value);
	};
	const handleApellidoChange = (event) => {
		setApellido(event.target.value);
	};
	const handleMailChange = (event) => {
		setMail(event.target.value);
	};
	const handleTelefonoChange = (event) => {
		setTelefono(event.target.value);
	};
	const handleFechaChange = (event) => {
		setFechaNacimiento(event.target.value);
	};
	const handleEstudiosChange = (event) => {
		setEstudiosCursados(event.target.value);
	};
	const handleExperienciaChange = (event) => {
		setExperiencia(event.target.value);
	};
	const handleTituloChange = (event) => {
		setTitulo(event.target.value);
	};

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		identifiedUser.nombre = nombre;
		identifiedUser.apellido = apellido;
		identifiedUser.mail = mail;
		identifiedUser.celular = telefono;
		if (auth.userType === "estudiante") {
			identifiedUser.fechaNacimiento = fechaNacimiento;
			identifiedUser.estudiosCursados = estudiosCursados;
		} else {
			identifiedUser.titulo = titulo;
			identifiedUser.experiencia = experiencia;
		}
		navigate.push(`/${auth.userId}/perfil`);
	};

	return (
		<>
			<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
				<MDBContainer fluid>
					<MDBRow className="justify-content-center align-items-center m-5">
						<MDBCard>
							<MDBCardBody className="px-4">
								<h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
									Update Profile
								</h3>

								<MDBRow>
									<MDBCol md="6">
										<MDBInput
											wrapperClass="mb-4"
											label="Nombre"
											size="lg"
											id="form1"
											type="text"
											onChange={handleNameChange}
											value={nombre}
										/>
									</MDBCol>

									<MDBCol md="6">
										<MDBInput
											wrapperClass="mb-4"
											label="Apellido"
											size="lg"
											id="form2"
											type="text"
											value={apellido}
											onChange={handleApellidoChange}
										/>
									</MDBCol>
								</MDBRow>

								<MDBRow>
									<MDBCol md="6">
										<MDBInput
											wrapperClass="mb-4"
											label="Email"
											size="lg"
											id="form4"
											type="email"
											value={mail}
											onChange={handleMailChange}
										/>
									</MDBCol>

									<MDBCol md="6">
										<MDBInput
											wrapperClass="mb-4"
											label="Phone Number"
											size="lg"
											id="form5"
											type="text"
											value={telefono}
											onChange={handleTelefonoChange}
										/>
									</MDBCol>
								</MDBRow>
								{auth.userType === "estudiante" && (
									<MDBRow>
										<MDBCol md="6">
											<MDBTextArea
												label="Estudios Cursados"
												id="textAreaExample"
												rows={3}
												value={estudiosCursados}
												onChange={handleEstudiosChange}
											/>
										</MDBCol>

										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Fecha Nacimiento"
												size="lg"
												id="form1"
												type="date"
												value={fechaNacimiento}
												onChange={handleFechaChange}
											/>
										</MDBCol>
									</MDBRow>
								)}

								{auth.userType === "profesor" && (
									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Titulo"
												size="lg"
												id="form4"
												type="text"
												value={titulo}
												onChange={handleTituloChange}
											/>
										</MDBCol>

										<MDBCol md="6">
											<MDBTextArea
												label="Experiencia"
												id="textAreaExample"
												rows={3}
												value={experiencia}
												onChange={handleExperienciaChange}
											/>
										</MDBCol>
									</MDBRow>
								)}

								<MDBBtn className="mb-4" size="lg">
									Submit
								</MDBBtn>
							</MDBCardBody>
						</MDBCard>
					</MDBRow>
				</MDBContainer>
			</form>
		</>
	);
};

export default UpdateUser;
