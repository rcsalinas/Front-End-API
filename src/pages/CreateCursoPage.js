import React, { useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

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
import ImageUpload from "../components/FormElements/ImageUpload";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQueryClient, useMutation } from "react-query";
import { useForm } from "../hooks/form-hook";
import * as api from "../MiAppApi";

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

	const { mutate, isLoading, isError, error } = useMutation(api.crearCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user", auth.userId]);
			queryClient.invalidateQueries(["cursos"]);
			navigate.push("/");
		},
	});

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

		const formData = new FormData();
		formData.append("nombre", nombre);
		formData.append("image", formState.inputs.image.value);
		formData.append("descripcion", descripcion);
		formData.append("tipo", tipo);
		formData.append("frecuencia", frecuencia);
		formData.append("duracion", duracion);
		formData.append("costo", costo);

		mutate(formData);
	};

	const [formState, inputHandler] = useForm(
		{
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	if (isLoading) {
		return <LoadingSpinner asOverlay />;
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
									type="text"
									placeholder="1 mes"
									onChange={handleDuracionChange}
									value={duracion}
									required
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol md="6">
								<FormControl fullWidth style={{ marginBottom: "5%" }}>
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
									placeholder="200"
									onChange={handleCostoChange}
									value={costo}
									required
								/>
							</MDBCol>
							<MDBCol md="6">
								<MDBTextArea
									label="Descripcion"
									id="textAreaExample"
									rows={2}
									value={descripcion}
									onChange={handleDescripcionChange}
									required
									wrapperClass="mb-4"
								/>
							</MDBCol>
						</MDBRow>
						<div style={{ marginLeft: "20%", marginRight: "20%", marginBottom: "2%" }}>
							<ImageUpload
								id="image"
								onInput={inputHandler}
								errorText="Proveer Imagen"
							></ImageUpload>
						</div>
						<div>
							<MDBBtn type="submit" style={{ width: "40%" }}>
								Crear
							</MDBBtn>
						</div>
					</form>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};
//necesito darle un nombre, frecuencia, si es individual o grupal, descripcion, y la duracion

export default CreateCursoPage;
