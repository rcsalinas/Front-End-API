import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";

import { useForm } from "../hooks/form-hook";
import Button from "../components/FormElements/Button";
import Input from "../components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";
import Card from "../components/UIElements/Card";
import "./Auth.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Redirect } from "react-router-dom";

const dummy_users = [
	{
		id: "alu1",
		nombre: "Roberto",
		apellido: "Salinas",
		password: "12345678",
		mail: "testalu1@test.com",
		celular: "1234",
		fechaNacimiento: "2015-03-25",
		estudiosCursados: ["primaria", "secundaria"],
		cursos: ["curso1", "curso3"],
	},
	{
		id: "alu2",
		nombre: "Roberto",
		apellido: "Salinas",
		password: "12345678",
		mail: "testalu2@test.com",
		celular: "1234",
		fechaNacimiento: "2015-03-25",
		estudiosCursados: ["primaria", "secundaria"],
		cursos: ["curso1", "curso2", "curso4"],
	},
];

const dummy_profesores = [
	{
		id: "profesor1",
		nombre: "Maria",
		apellido: "Maria",
		password: "12345678",
		mail: "testprof1@test.com",
		celular: "1234",
		fechaNacimiento: "2015-03-25",
		titulo: "licenciado en nada",
		experiencia: "trabaje en microsoft",
		cursos: ["curso1", "curso3", "curso4"],
	},
	{
		id: "profesor2",
		nombre: "Jose",
		apellido: "Aguilar",
		password: "12345678",
		mail: "testprof2@test.com",
		celular: "1234",
		fechaNacimiento: "2017-03-25",
		titulo: "Ingeniero en nada",
		experiencia: "trabaje en Uber",
		cursos: ["curso2"],
	},
];

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [tipoUsuario, setTipoUsuario] = useState("estudiante");
	const [idUsuario, setIdUsuario] = useState(null);
	const [loginError, setLoginError] = useState(null);
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
						estudios: undefined,
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
						estudios: {
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

	const authSubmitHandler = (event) => {
		event.preventDefault();

		let encontrado = false;
		let validacion = false;

		if (isLoginMode) {
			if (tipoUsuario === "estudiante") {
				for (let i = 0; i < dummy_users.length && encontrado === false; i++) {
					if (dummy_users[i].mail === formState.inputs.email.value) {
						encontrado = true;
						if (dummy_users[i].password === formState.inputs.password.value) {
							validacion = true;
						} else {
							validacion = false;
						}
					}
				}

				if (validacion === false && encontrado === true) {
					setLoginError("Contraseña Incorrecta");
				} else if (encontrado === false) {
					setLoginError("No existe un usuario asociado a ese email");
				} else if (validacion === true) {
					console.log(tipoUsuario, idUsuario);
					auth.login(tipoUsuario, formState.inputs.email.value);
				}
			} else {
				//misma validacion pero para profesores. Asi va a ocurrir en el backend
				for (let i = 0; i < dummy_profesores.length && encontrado === false; i++) {
					if (dummy_profesores[i].mail === formState.inputs.email.value) {
						encontrado = true;
						if (dummy_profesores[i].password === formState.inputs.password.value) {
							validacion = true;
						} else {
							validacion = false;
						}
					}
				}

				if (validacion === false && encontrado === true) {
					setLoginError("Contraseña Incorrecta");
				} else if (encontrado === false) {
					setLoginError("No existe un usuario asociado a ese email");
				} else if (validacion === true) {
					//por el momento manejo el id como el mail ya que no estoy con token
					auth.login(tipoUsuario, formState.inputs.email.value);
				}
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
			<Card className="authentication">
				<h2>Inicio de Sesion Requerido</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
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
					{!isLoginMode && tipoUsuario === "estudiante" && (
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
							<Input
								element="input"
								id="estudios"
								type="text"
								label="Estudios en curso y cursados"
								placeholder="Cursados: () ,En curso:()"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Porfavor ingresar estudios cursados y en curso"
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
					{!isLoginMode && tipoUsuario === "profesor" && (
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
						errorText="Porfavor ingresar contraseña valida, minimo 6 caracteres"
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? "LOGIN" : "SIGNUP"}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default Auth;
