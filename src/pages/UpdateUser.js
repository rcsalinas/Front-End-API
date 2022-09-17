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

import FormLabel from "@mui/material/FormLabel";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const dummy_users = database_Dummy.dummy_users;

const UpdateUser = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);

	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [mail, setMail] = useState("");
	const [telefono, setTelefono] = useState("");
	const [fechaNacimiento, setFechaNacimiento] = useState("");
	const [datosEstudios, setDatosEstudios] = useState([]);
	const [experiencia, setExperiencia] = useState("");
	const [titulo, setTitulo] = useState("");
	const [estudios, setEstudiosCursados] = React.useState({
		primario: false,
		secundario: false,
		universidad: false,
	});
	const { primario, secundario, universidad } = estudios;

	let identifiedUser;
	identifiedUser = dummy_users.find((u) => u.id === auth.userId);

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
	}, []);

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

	const handleExperienciaChange = (event) => {
		setExperiencia(event.target.value);
	};
	const handleTituloChange = (event) => {
		setTitulo(event.target.value);
	};
	const handleChangeCheckbox = (event) => {
		let previos = [...datosEstudios];
		setEstudiosCursados({
			...estudios,
			[event.target.name]: event.target.checked,
		});
		if (event.target.checked) {
			if (!previos.includes(event.target.name)) {
				previos.push(event.target.name);
				setDatosEstudios(previos);
			}
		} else {
			previos = previos.filter((item) => {
				return item !== event.target.name;
			});
			setDatosEstudios(previos);
		}
	};

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		identifiedUser.nombre = nombre;
		identifiedUser.apellido = apellido;
		identifiedUser.mail = mail;
		identifiedUser.celular = telefono;
		if (auth.userType === "estudiante") {
			identifiedUser.fechaNacimiento = fechaNacimiento;
			identifiedUser.estudiosCursados = datosEstudios;
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
											required
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
											required
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
											required
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
											required
										/>
									</MDBCol>
								</MDBRow>
								{auth.userType === "estudiante" && (
									<MDBRow>
										<MDBCol md="6">
											<FormLabel component="legend">
												Estudios Completados
											</FormLabel>
											<FormGroup required>
												<FormControlLabel
													control={
														<Checkbox
															checked={primario}
															onChange={handleChangeCheckbox}
															name="primario"
														/>
													}
													label="Primario"
												/>
												<FormControlLabel
													control={
														<Checkbox
															checked={secundario}
															onChange={handleChangeCheckbox}
															name="secundario"
														/>
													}
													label="Secundario"
												/>
												<FormControlLabel
													control={
														<Checkbox
															checked={universidad}
															onChange={handleChangeCheckbox}
															name="universidad"
														/>
													}
													label="Universidad"
												/>
											</FormGroup>
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
												required
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
												required
											/>
										</MDBCol>

										<MDBCol md="6">
											<MDBTextArea
												label="Experiencia"
												id="textAreaExample"
												rows={3}
												value={experiencia}
												onChange={handleExperienciaChange}
												required
											/>
										</MDBCol>
									</MDBRow>
								)}

								<MDBBtn type="submit" className="mb-4" size="lg">
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
