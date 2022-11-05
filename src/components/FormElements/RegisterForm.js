import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
} from "mdb-react-ui-kit";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./RegisterForm.css";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ImageUpload from "./ImageUpload";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "../../hooks/form-hook";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useQueryClient, useMutation } from "react-query";
import * as api from "../../MiAppApi";

const RegisterForm = (props) => {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();

	const [tipoUsuario, setTipoUsuario] = useState("estudiante");
	const [date, setDate] = React.useState(dayjs("2014-08-18T21:11:54"));
	const [datosEstudios, setDatosEstudios] = useState([]);
	const [estudios, setEstudiosCursados] = React.useState({
		primario: false,
		secundario: false,
		universidad: false,
	});
	const { primario, secundario, universidad } = estudios;
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [telefono, setTelefono] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [titulo, setTitulo] = useState("");
	const [experiencia, setExperiencia] = useState("");

	const [formState, inputHandler] = useForm(
		{
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const { mutate, error, isLoading, isError } = useMutation(api.registerUser, {
		onSuccess: (data) => {
			auth.login(data.userId, data.token, data.tipo);
			queryClient.setQueryData(["usuario", data.userId], data);
		},
	});

	const handleRegister = () => {
		const formData = new FormData();
		formData.append("nombre", nombre);
		formData.append("image", formState.inputs.image.value);
		formData.append("apellido", apellido);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("tipo", tipoUsuario);
		formData.append("telefono", telefono);
		if (tipoUsuario === "estudiante") {
			formData.append("estudiosCursados", datosEstudios);
			formData.append("fechaNacimiento", date.format());
		} else {
			formData.append("titulo", titulo);
			formData.append("experiencia", experiencia);
		}
		mutate(formData);
	};

	const handleChange = (event, value) => {
		setTipoUsuario(value);
	};

	const handleChangeDate = (newValue) => {
		setDate(newValue);
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

	if (isError) {
		alert(error);
	}
	if (isLoading) {
		<LoadingSpinner asOverlay />;
	}

	return (
		<MDBContainer fluid className="h-custom">
			<MDBRow className="d-flex justify-content-center align-items-center h-100">
				<MDBCol col="12" className="m-5">
					<MDBCard
						className="card-registration card-registration-2"
						style={{ borderRadius: "15px" }}
					>
						<MDBCardBody className="p-0">
							<MDBRow>
								<MDBCol md="6" className="p-5 bg-white">
									<h3 className="fw-normal mb-5" style={{ color: "#3B71CA" }}>
										Informacion General
									</h3>

									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												wrapperClass="mb-4"
												label="Nombre"
												size="lg"
												id="form1"
												type="text"
												value={nombre}
												onChange={(event) => {
													setNombre(event.target.value);
												}}
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
												onChange={(event) => {
													setApellido(event.target.value);
												}}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												label="Email"
												type="email"
												wrapperClass="mb-4"
												size="lg"
												value={email}
												onChange={(event) => {
													setEmail(event.target.value);
												}}
											/>
										</MDBCol>
										<MDBCol md="6">
											<MDBInput
												label="Password"
												type="password"
												wrapperClass="mb-4"
												size="lg"
												value={password}
												onChange={(event) => {
													setPassword(event.target.value);
												}}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol md="6">
											<MDBInput
												label="Telefono"
												type="text"
												wrapperClass="mb-4"
												size="lg"
												value={telefono}
												onChange={(event) => {
													setTelefono(event.target.value);
												}}
											/>
										</MDBCol>
									</MDBRow>

									<ToggleButtonGroup
										color="primary"
										value={tipoUsuario}
										exclusive
										onChange={handleChange}
										aria-label="Platform"
									>
										<ToggleButton value="estudiante">Estudiante</ToggleButton>
										<ToggleButton value="profesor">Profesor</ToggleButton>
									</ToggleButtonGroup>
								</MDBCol>

								<MDBCol md="6" className="bg-indigo p-5">
									<h3 className="fw-normal mb-5 " style={{ color: "#332D2D" }}>
										Informacion Adicional
									</h3>
									{tipoUsuario === "estudiante" && (
										<>
											<MDBRow>
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
											</MDBRow>
											<MDBRow>
												<FormControl
													sx={{ m: 3 }}
													component="fieldset"
													variant="standard"
													required
												>
													<FormLabel component="legend">
														Estudios Completados
													</FormLabel>
													<FormGroup>
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
												</FormControl>
												<ImageUpload
													id="image"
													onInput={inputHandler}
													errorText="Proveer Imagen"
												/>
											</MDBRow>
										</>
									)}
									{tipoUsuario === "profesor" && (
										<>
											<MDBInput
												wrapperClass="mb-4"
												label="Titulo"
												size="lg"
												id="form5"
												type="text"
												value={titulo}
												onChange={(event) => {
													setTitulo(event.target.value);
												}}
											/>
											<MDBInput
												wrapperClass="mb-4"
												label="Experiencia"
												size="lg"
												id="form6"
												type="text"
												value={experiencia}
												onChange={(event) => {
													setExperiencia(event.target.value);
												}}
											/>
											<ImageUpload
												id="image"
												onInput={inputHandler}
												errorText="Proveer Imagen"
											/>
										</>
									)}
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignContent: "center",
											marginTop: "5%",
										}}
									>
										<MDBBtn color="light" size="lg" onClick={handleRegister}>
											Register
										</MDBBtn>
									</div>
								</MDBCol>
							</MDBRow>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default RegisterForm;
