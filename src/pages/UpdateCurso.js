import React from "react";
import { useState, useEffect } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useQueryClient, useMutation, useQuery } from "react-query";

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
import ImageUpload from "../components/FormElements/ImageUpload";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { useForm } from "../hooks/form-hook";
import * as api from "../MiAppApi";

const UpdateCurso = () => {
	let navigate = useHistory();
	const queryClient = useQueryClient();
	const cursoId = useParams().cursoId;
	const auth = useContext(AuthContext);
	const [nombre, setNombre] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [frecuencia, setFrecuencia] = React.useState("");
	const [tipo, setTipo] = React.useState("");
	const [duracion, setDuracion] = React.useState("");
	const [costo, setCosto] = React.useState("");
	const [formState, inputHandler] = useForm(
		{
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);
	const { data, error, isError, isLoading } = useQuery(["curso", cursoId], () =>
		api.fetchCursoPorId(cursoId)
	);

	useEffect(() => {
		if (!isLoading) {
			setNombre(data.nombre);
			setDescripcion(data.descripcion);
			setFrecuencia(data.frecuencia);
			setTipo(data.tipo);
			setDuracion(data.duracion);
			setCosto(data.costo);
		}
	}, [data, isLoading]);

	const { mutate, isLoading: isLoadingUpdate } = useMutation(api.updateCurso, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["cursos", auth.userId]);
			queryClient.setQueryData(["curso", cursoId], data);
			queryClient.invalidateQueries(["curso", cursoId]);
			navigate.push(`/${auth.userId}/cursos`);
		},
	});

	if (isError) {
		return <div>{error.response.data.message}</div>;
	}

	if (isLoading || isLoadingUpdate) {
		return <LoadingSpinner asOverlay />;
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
	const handleUpdateCurso = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("nombre", nombre);
		formData.append("image", formState.inputs.image.value);
		formData.append("descripcion", descripcion);
		formData.append("frecuencia", frecuencia);
		formData.append("tipo", tipo);
		formData.append("duracion", duracion);
		formData.append("costo", parseFloat(costo));
		formData.append("cursoId", cursoId);
		mutate(formData);
	};
	if (isLoading || isLoadingUpdate) {
		return <LoadingSpinner asOverlay />;
	}

	if (isError) {
		alert(error);
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
					<form onSubmit={handleUpdateCurso}>
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
								/>
							</MDBCol>
						</MDBRow>
						<div
							style={{
								marginLeft: "20%",
								marginRight: "20%",
								marginBottom: "5%",
								marginTop: "5%",
							}}
						>
							<ImageUpload
								id="image"
								onInput={inputHandler}
								errorText="Proveer Imagen"
							></ImageUpload>
						</div>

						<div>
							<MDBBtn type="submit" style={{ width: "40%" }}>
								Modificar
							</MDBBtn>
						</div>
					</form>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};

export default UpdateCurso;
