import React from "react";

import ProfileBody from "../components/Users/ProfileBody";
import { AuthContext } from "../context/auth-context";

import { useContext } from "react";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import { useQuery } from "react-query";
import dayjs from "dayjs";

import * as api from "../MiAppApi";

const Profile = () => {
	const auth = useContext(AuthContext);
	const { data, error, isError, isLoading } = useQuery(
		["user", auth.userId],
		api.fetchUserPerfil
	);

	if (isError) {
		return <div>{error.response.data.message}</div>;
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
			//dayjs("12-25-1995", "MM-DD-YYYY")
			let fechaNacimiento = dayjs(data.user.fechaNacimiento).format("DD/MM/YYYY");
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
