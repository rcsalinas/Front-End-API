import React from "react";
import { useState, useEffect } from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";
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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

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

	const { data, error, isError, isLoading } = useQuery(["curso", cursoId], fetchCurso);

	useEffect(() => {
		if (!isLoading) {
			setNombre(data.nombreCurso);
			setDescripcion(data.desc);
			setFrecuencia(data.frecuencia);
			setTipo(data.tipo);
			setDuracion(data.duracion);
			setCosto(data.costo);
		}
	}, [data, isLoading]);

	const { mutate, isLoading: isLoadingUpdate } = useMutation(updateCurso, {
		onSuccess: (data) => {
			queryClient.setQueryData(["curso", cursoId], data);
			queryClient.invalidateQueries(["curso", cursoId]);
			queryClient.invalidateQueries(["cursos", cursoId]);
		},
	});

	async function fetchCurso() {
		const { data } = await axios.get(`http://localhost:8000/cursos/${cursoId}`);
		console.log(data);
		return data;
	}
	async function updateCurso() {
		const { data } = await axios.patch(`http://localhost:8000/cursos/${cursoId}`, {
			nombreCurso: nombre,
			desc: descripcion,
			frecuencia: frecuencia,
			tipo: tipo,
			duracion: duracion,
			costo: parseFloat(costo),
		});
		return data;
	}

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	if (isLoading || isLoadingUpdate) {
		return <LoadingSpinner />;
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
		mutate();
		navigate.push(`/${auth.userId}/cursos`);
	};

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
							Modificar
						</MDBBtn>
					</form>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};

export default UpdateCurso;
