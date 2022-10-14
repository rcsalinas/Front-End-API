import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

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
import { useForm } from "../hooks/form-hook";
import ImageUpload from "../components/FormElements/ImageUpload";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormLabel from "@mui/material/FormLabel";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";

const UpdateUser = () => {
	let navigate = useHistory();
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [date, setDate] = React.useState(dayjs("2014-08-18T21:11:54"));
	const [mail, setMail] = useState("");
	const [telefono, setTelefono] = useState("");

	const [datosEstudios, setDatosEstudios] = useState([]);
	const [experiencia, setExperiencia] = useState("");
	const [titulo, setTitulo] = useState("");
	const [estudios, setEstudiosCursados] = React.useState({
		primario: false,
		secundario: false,
		universidad: false,
	});
	const { primario, secundario, universidad } = estudios;

	const [formState, inputHandler] = useForm(
		{
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const {
		data: identifiedUser,
		error,
		isError,
		isLoading,
	} = useQuery(["user", auth.userId], fetchUsuario);

	useEffect(() => {
		if (!isLoading) {
			setNombre(identifiedUser.user.nombre);
			setApellido(identifiedUser.user.apellido);
			setMail(identifiedUser.user.email);
			setTelefono(identifiedUser.user.telefono);
			if (auth.userType === "estudiante") {
				setDate(dayjs(identifiedUser.user.fechaNacimiento));
				setDatosEstudios(identifiedUser.user.estudiosCursados);
				setEstudiosCursados({
					primario: identifiedUser.user.estudiosCursados.includes("primario"),
					secundario: identifiedUser.user.estudiosCursados.includes("secundario"),
					universidad: identifiedUser.user.estudiosCursados.includes("universidad"),
				});
			} else {
				setExperiencia(identifiedUser.user.experiencia);
				setTitulo(identifiedUser.user.titulo);
			}
		}
	}, []);

	const { mutate, isLoading: isLoadingUpdate } = useMutation(updateUser, {
		onSuccess: (data) => {
			queryClient.setQueryData(["user", auth.userId], data);
			queryClient.invalidateQueries(["user", auth.userId]);
		},
	});

	async function updateUser(payload) {
		const { data } = await axios.patch(
			`http://localhost:5000/api/users/${auth.userId}`,
			payload,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);
		return data;
	}

	async function fetchUsuario() {
		const { data } = await axios.get(`http://localhost:5000/api/users/${auth.userId}`);
		return data;
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
	const handleChangeDate = (newValue) => {
		setDate(newValue);
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
		const formData = new FormData();
		formData.append("nombre", nombre);
		formData.append("image", formState.inputs.image.value);
		formData.append("apellido", apellido);
		formData.append("email", mail);
		formData.append("telefono", telefono);
		if (auth.userType === "estudiante") {
			formData.append("estudiosCursados", datosEstudios);
			formData.append("fechaNacimiento", date.format());
		} else {
			formData.append("titulo", titulo);
			formData.append("experiencia", experiencia);
		}

		mutate(formData);
		/*if (auth.userType === "estudiante") {
			mutate({
				nombre: nombre,
				apellido: apellido,
				email: mail,
				celular: telefono,
				fechaNacimiento: fechaNacimiento,
				estudiosCursados: datosEstudios,
			});
		} else {
			mutate({
				nombre: nombre,
				apellido: apellido,
				email: mail,
				celular: telefono,
				titulo: titulo,
				experiencia: experiencia,
			});
		}*/

		navigate.push(`/${auth.userId}/perfil`);
	};

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	if (isLoading || isLoadingUpdate) {
		return <LoadingSpinner asOverlay />;
	}

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
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<Stack spacing={3}>
													<DesktopDatePicker
														label="Fecha Nacimiento"
														inputFormat="MM/DD/YYYY"
														value={date}
														onChange={handleChangeDate}
														renderInput={(params) => (
															<TextField {...params} />
														)}
													/>
												</Stack>
											</LocalizationProvider>
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
								<div
									style={{
										marginLeft: "20%",
										marginRight: "20%",
										marginBottom: "4%",
									}}
								>
									<ImageUpload
										id="image"
										onInput={inputHandler}
										errorText="Proveer Imagen"
									/>
								</div>
							</MDBCardBody>
							<MDBBtn
								type="submit"
								className="mb-4"
								size="lg"
								style={{ margin: "0 auto" }}
							>
								Update
							</MDBBtn>
						</MDBCard>
					</MDBRow>
				</MDBContainer>
			</form>
		</>
	);
};

export default UpdateUser;
