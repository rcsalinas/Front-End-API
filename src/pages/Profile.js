import React from "react";

import ProfileBody from "../components/Users/ProfileBody";
import { AuthContext } from "../context/auth-context";

import { useContext } from "react";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import axios from "axios";
import { useQuery } from "react-query";

const Profile = () => {
	const auth = useContext(AuthContext);
	const { data, error, isError, isLoading } = useQuery(["user", auth.userId], fetchUserPerfil);

	async function fetchUserPerfil() {
		const { data } = await axios.get(`http://localhost:5000/api/users/${auth.userId}`);

		return data;
	}

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	//aqui voy a traer el usuario segun el id y le paso los datos a el componente

	if (isLoading) {
		return <LoadingSpinner asOverlay />;
	}

	if (!isLoading && !isError) {
		let nombre = data.user.nombre;
		let apellido = data.user.apellido;
		let mail = data.user.email;
		let celular = data.user.telefono;
		let image = data.user.image;

		if (auth.userType === "estudiante") {
			let fechaNacimiento = data.user.fechaNacimiento;
			let estudiosCursados = data.user.estudiosCursados;
			return (
				<ProfileBody
					nombre={nombre}
					apellido={apellido}
					mail={mail}
					celular={celular}
					fechaNacimiento={fechaNacimiento}
					estudiosCursados={estudiosCursados}
					image={image}
				/>
			);
		} else {
			let titulo = data.user.titulo;
			let experiencia = data.user.experiencia;
			return (
				<ProfileBody
					nombre={nombre}
					apellido={apellido}
					mail={mail}
					celular={celular}
					titulo={titulo}
					experiencia={experiencia}
					image={image}
				/>
			);
		}
	}
};

export default Profile;
