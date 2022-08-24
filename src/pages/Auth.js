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
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
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
					{!isLoginMode && tipoUsuario == "estudiante" && (
						<Input
							element="input"
							id="name"
							type="text"
							label="Nombre"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Porfavor ingresar nombre"
							onInput={inputHandler}
						/>
					)}
					{!isLoginMode && tipoUsuario == "profesor" && (
						<Input
							element="input"
							id="name"
							type="text"
							label="Nombre"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Porfavor ingresar nombre"
							onInput={inputHandler}
						/>
					)}

					<Input
						element="input"
						id="email"
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
			</Card>
		</React.Fragment>
	);
};

export default Auth;
