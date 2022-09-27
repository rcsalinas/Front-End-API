import React, { useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
	MDBBtn,
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBRow,
	MDBInput,
	MDBTextArea,
} from "mdb-react-ui-kit";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";

const CreateCursoPage = () => {
	let navigate = useHistory();
	const queryClient = useQueryClient();
	const auth = useContext(AuthContext);

	const [nombre, setNombre] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [frecuencia, setFrecuencia] = React.useState("");
	const [tipo, setTipo] = React.useState("");
	const [duracion, setDuracion] = React.useState("");
	const [costo, setCosto] = React.useState("");

	const { mutate, isLoading, isError, error } = useMutation(crearCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user", auth.userId]);
			queryClient.invalidateQueries(["cursos"]);
			navigate.push("/");
		},
	});

	async function crearCurso(payload) {
		const { data } = await axios.post(`http://localhost:8000/cursos/`, payload);
		return data;
	}

	const handleNameChange = (event) => {
		setNombre(event.target.value);
	};
	const handleDescripcionChange = (event) => {
		setDescripcion(event.target.value);
	};
	const handleFrecuenciaChange = (event) => {
		setFrecuencia(event.target.value);
	};
	const handleTipoChange = (event) => {
		setTipo(event.target.value);
	};
	const handleDuracionChange = (event) => {
		setDuracion(event.target.value);
	};
	const handleCostoChange = (event) => {
		setCosto(event.target.value);
	};

	const handleCrearCurso = (event) => {
		event.preventDefault();

		mutate({
			estado: true,
			nombreCurso: nombre,
			image: "https://www.apwa.net/images/PWM101.jpg",
			profesor: `${auth.userId}`,
			desc: descripcion,
			alumnos: [],
			duracion: duracion,
			frecuencia: frecuencia,
			calificaciones: [],
			tipo: tipo,
			costo: costo,
			calificacion: 5,
		});
	};

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<MDBContainer fluid>
			<div
				className="p-5 bg-image"
				style={{
					backgroundImage: "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
					height: "300px",
				}}
			></div>

			<MDBCard
				className="mx-5 mb-5 p-5 shadow-5"
				style={{
					marginTop: "-100px",
					background: "hsla(0, 0%, 100%, 0.8)",
					backdropFilter: "blur(30px)",
				}}
			>
				<MDBCardBody className="p-5 text-center">
					<h2 style={{ textAlign: "left" }}>Datos del Curso:</h2>
					<form onSubmit={handleCrearCurso}>
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
									label="Duracion"
									size="lg"
									id="form1"
									type="text"
									onChange={handleDuracionChange}
									value={duracion}
									required
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol md="6">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Frecuencia
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={frecuencia}
										label="Frecuencia"
										onChange={handleFrecuenciaChange}
										required
									>
										<MenuItem value={"unica"}>Unica</MenuItem>
										<MenuItem value={"semanal"}>Semanal</MenuItem>
										<MenuItem value={"mensual"}>Mensual</MenuItem>
									</Select>
								</FormControl>
							</MDBCol>
							<MDBCol md="6">
								<FormControl fullWidth required>
									<InputLabel id="demo-simple-select-label">
										Tipo de clase
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={tipo}
										label="Tipo de Clase"
										onChange={handleTipoChange}
										required
									>
										<MenuItem value={"individual"}>Individual</MenuItem>
										<MenuItem value={"grupal"}>Grupal</MenuItem>
									</Select>
								</FormControl>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol md="6">
								<MDBInput
									wrapperClass="mb-4"
									label="Precio"
									size="lg"
									id="form1"
									type="text"
									onChange={handleCostoChange}
									value={costo}
									required
								/>
							</MDBCol>
							<MDBCol md="6">
								<MDBTextArea
									label="Descripcion"
									id="textAreaExample"
									rows={3}
									value={descripcion}
									onChange={handleDescripcionChange}
									required
								/>
							</MDBCol>
						</MDBRow>

						<MDBBtn type="submit" className="w-100 mb-4" size="md">
							Crear
						</MDBBtn>
					</form>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};
//necesito darle un nombre, frecuencia, si es individual o grupal, descripcion, y la duracion

export default CreateCursoPage;
