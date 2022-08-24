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

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [tipoUsuario, setTipoUsuario] = useState("estudiante");
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
		if (!isLoginMode && tipoUsuario === "estudiante") {
			setFormData(
				{
					...formState.inputs,
					date: undefined,
					estudios: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					date: {
						value: "",
						isValid: false,
					},
					estudios: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		if (!isLoginMode && tipoUsuario == "profesor") {
			setFormData(
				{
					...formState.inputs,
					titulo: undefined,
					experiencia: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					titulo: {
						value: "",
						isValid: false,
					},
					experiencia: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};
	const authSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
		auth.login();
	};

	const handleChange = (event, newAlignment) => {
		setTipoUsuario(newAlignment);
	};

	return (
		<React.Fragment>
			<Card className="authentication">
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
					{!isLoginMode && tipoUsuario == "estudiante" && (
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
						</>
					)}
					{!isLoginMode && tipoUsuario == "profesor" && (
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
