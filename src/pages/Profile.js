import React from "react";

import ProfileBody from "../components/Users/ProfileBody";
import { AuthContext } from "../context/auth-context";

import { useParams } from "react-router-dom";
import { useContext } from "react";
import { database_Dummy } from "../util/sharedData";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import axios from "axios";
import { useQuery } from "react-query";

//const dummy_users = database_Dummy.dummy_users;

const Profile = () => {
	const auth = useContext(AuthContext);
	const { data, error, isError, isLoading } = useQuery(["users", auth.userId], fetchUserPerfil);
	//const userId = useParams().userId;

	//let identifiedUser;
	//identifiedUser = dummy_users.find((u) => u.id === userId);
	async function fetchUserPerfil() {
		const { data } = await axios.get(`http://localhost:8000/users/${auth.userId}`);

		return data;
	}

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	//aqui voy a traer el usuario segun el id y le paso los datos a el componente

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!isLoading && !isError) {
		let nombre = data.nombre;
		let apellido = data.apellido;
		let mail = data.email;
		let celular = data.celular;

		if (auth.userType === "estudiante") {
			let fechaNacimiento = data.fechaNacimiento;
			let estudiosCursados = data.estudiosCursados;
			return (
				<ProfileBody
					nombre={nombre}
					apellido={apellido}
					mail={mail}
					celular={celular}
					fechaNacimiento={fechaNacimiento}
					estudiosCursados={estudiosCursados}
				/>
			);
		} else {
			let titulo = data.titulo;
			let experiencia = data.experiencia;
			return (
				<ProfileBody
					nombre={nombre}
					apellido={apellido}
					mail={mail}
					celular={celular}
					titulo={titulo}
					experiencia={experiencia}
				/>
			);
		}
	}
};

export default Profile;
