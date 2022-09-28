import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";

import { useForm } from "../hooks/form-hook";

import { MDBBtn } from "mdb-react-ui-kit";
import Input from "../components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";
import Card from "../components/UIElements/Card";
import "./Auth.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Redirect } from "react-router-dom";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";
import { MDBCheckbox } from "mdb-react-ui-kit";

import Checkbox from "@mui/material/Checkbox";

const Auth = () => {
	const auth = useContext(AuthContext);

	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [tipoUsuario, setTipoUsuario] = useState("estudiante");
	const [datosEstudios, setDatosEstudios] = useState([]);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);
	const [estudios, setEstudiosCursados] = React.useState({
		primario: false,
		secundario: false,
		universidad: false,
	});
	const { primario, secundario, universidad } = estudios;

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

	const switchModeHandler = () => {
		if (!isLoginMode) {
			if (tipoUsuario === "estudiante") {
				setFormData(
					{
						email: formState.inputs.email,
						password: formState.inputs.password,
						telefono: undefined,
						nombre: undefined,
						apellido: undefined,
						date: undefined,
					},
					formState.inputs.email.isValid && formState.inputs.password.isValid
				);
			} else if (tipoUsuario === "profesor") {
				setFormData(
					{
						email: formState.inputs.email,
						password: formState.inputs.password,
						telefono: undefined,
						nombre: undefined,
						apellido: undefined,
						titulo: undefined,
						experiencia: undefined,
					},
					formState.inputs.email.isValid && formState.inputs.password.isValid
				);
			}
		} else {
			if (tipoUsuario === "estudiante") {
				setFormData(
					{
						email: formState.inputs.email,
						password: formState.inputs.password,
						date: {
							value: null,
							isValid: true,
						},
						nombre: {
							value: "",
							isValid: false,
						},
						apellido: {
							value: "",
							isValid: false,
						},
						telefono: {
							value: "",
							isValid: false,
						},
					},
					false
				);
			} else if (tipoUsuario === "profesor") {
				setFormData(
					{
						email: formState.inputs.email,
						password: formState.inputs.password,
						titulo: {
							value: "",
							isValid: false,
						},
						experiencia: {
							value: "",
							isValid: false,
						},
						nombre: {
							value: "",
							isValid: false,
						},
						apellido: {
							value: "",
							isValid: false,
						},
						telefono: {
							value: "",
							isValid: false,
						},
					},
					false
				);
			}
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					"http://localhost:8000/login",
					"POST",
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
					{
						"Content-Type": "application/json",
					}
				);

				auth.login(responseData.user.id, responseData.accessToken, responseData.user.tipo);
			} catch (err) {
				alert(err);
			}
		} else {
			try {
				let responseData;
				if (tipoUsuario === "estudiante") {
					responseData = await sendRequest(
						"http://localhost:8000/register",
						"POST",
						JSON.stringify({
							email: formState.inputs.email.value,
							password: formState.inputs.password.value,
							nombre: formState.inputs.nombre.value,
							apellido: formState.inputs.apellido.value,
							celular: formState.inputs.telefono.value,
							tipo: "estudiante",
							fechaNacimiento: formState.inputs.date.value,
							estudiosCursados: datosEstudios,
							cursos: [],
						}),
						{
							"Content-Type": "application/json",
						}
					);
				} else {
					responseData = await sendRequest(
						"http://localhost:8000/register",
						"POST",
						JSON.stringify({
							email: formState.inputs.email.value,
							password: formState.inputs.password.value,
							nombre: formState.inputs.nombre.value,
							apellido: formState.inputs.apellido.value,

							celular: formState.inputs.telefono.value,
							tipo: "profesor",
							titulo: formState.inputs.titulo.value,
							experiencia: formState.inputs.experiencia.value,
							cursos: [],
						}),
						{
							"Content-Type": "application/json",
						}
					);
				}

				auth.login(responseData.user.id, responseData.accessToken, responseData.user.tipo);
			} catch (err) {
				alert(err);
			}
		}
	};

	const handleChange = (event, value) => {
		setTipoUsuario(value);
		if (tipoUsuario === "estudiante") {
			setFormData(
				{
					email: formState.inputs.email,
					password: formState.inputs.password,
					nombre: undefined,
					apellido: undefined,
					telefono: undefined,
					date: undefined,
					estudios: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		}
		setFormData(
			{
				email: formState.inputs.email,
				password: formState.inputs.password,
				nombre: undefined,
				apellido: undefined,
				telefono: undefined,
				titulo: undefined,
				experiencia: undefined,
			},
			formState.inputs.email.isValid && formState.inputs.password.isValid
		);
	};

	return (
		<React.Fragment>
			{auth.isLoggedIn && <Redirect to="/" />}
			<ErrorModal error={error} onClear={clearError} />
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Inicio de Sesion Requerido</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<ToggleButtonGroup
							color="primary"
							value={tipoUsuario}
							exclusive
							onChange={handleChange}
							aria-label="Platform"
							style={{ marginTop: "4%" }}
						>
							<ToggleButton value="estudiante">Estudiante</ToggleButton>
							<ToggleButton value="profesor">Profesor</ToggleButton>
						</ToggleButtonGroup>
					)}
					{!isLoginMode &&
						tipoUsuario === "estudiante" && ( //signup form estudiante
							<>
								<Input
									element="input"
									id="date"
									type="date"
									label="Fecha de Nacimiento"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar fecha de nacimiento"
									onInput={inputHandler}
								/>
								<FormControl
									sx={{ m: 3 }}
									component="fieldset"
									variant="standard"
									required
								>
									<FormLabel component="legend">Estudios Completados</FormLabel>
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
								<Input
									element="input"
									id="nombre"
									type="text"
									label="Nombre"
									placeholder="Ingrese su primer nombre"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar nombre"
									onInput={inputHandler}
								/>
								<Input
									element="input"
									id="apellido"
									type="text"
									label="Apellido"
									placeholder="Ingrese su apellido"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar apellido"
									onInput={inputHandler}
								/>
								<Input
									element="input"
									id="telefono"
									type="text"
									label="Telefono"
									placeholder="+54 00 0000-0000"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar telefono"
									onInput={inputHandler}
								/>
							</>
						)}
					{!isLoginMode &&
						tipoUsuario === "profesor" && ( //signup form profesor
							<>
								<Input
									element="input"
									id="titulo"
									type="text"
									label="Titulo"
									placeholder="Lic en informatica"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar titulo"
									onInput={inputHandler}
								/>
								<Input
									element="input"
									id="experiencia"
									type="text"
									label="Experiencia"
									placeholder="Semisenior Fullstack Engineer"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar experiencia"
									onInput={inputHandler}
								/>
								<Input
									element="input"
									id="nombre"
									type="text"
									label="Nombre"
									placeholder="Ingrese su primer nombre"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar nombre"
									onInput={inputHandler}
								/>
								<Input
									element="input"
									id="apellido"
									type="text"
									label="Apellido"
									placeholder="Ingrese su apellido"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar apellido"
									onInput={inputHandler}
								/>
								<Input
									element="input"
									id="telefono"
									type="text"
									label="Telefono"
									placeholder="+54 00 0000-0000"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Porfavor ingresar telefono"
									onInput={inputHandler}
								/>
							</>
						)}

					<Input
						element="input"
						id="email"
						placeholder="email@email.com"
						type="email"
						label="E-Mail"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Porfavor ingresar email valido"
						onInput={inputHandler}
					/>
					<Input
						element="input"
						id="password"
						type="password"
						label="Password"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Porfavor ingresar contraseña"
						onInput={inputHandler}
					/>
					{isLoginMode && (
						<div className="d-flex justify-content-between mx-3 mb-4">
							<MDBCheckbox
								name="flexCheck"
								value=""
								id="flexCheckDefault"
								label="Remember me"
							/>
							<Link to="/forgotPassword">Forgot Password?</Link>
						</div>
					)}
					<MDBBtn type="submit" disabled={!formState.isValid}>
						{isLoginMode ? "LOGIN" : "SIGNUP"}
					</MDBBtn>
				</form>
				<MDBBtn type="submit" className="mx-2" toggle active onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
				</MDBBtn>
			</Card>
		</React.Fragment>
	);
};

export default Auth;
