import React from "react";

import ProfileBody from "../components/Users/ProfileBody";
import { AuthContext } from "../context/auth-context";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";

const dummy_users = [
	{
		id: "alu1",
		nombre: "Roberto",
		apellido: "Salinas",
		password: "12345678",
		mail: "testalu1@test.com",
		celular: "1234",
		fechaNacimiento: "2015-03-25",
		estudiosCursados: "primaria, secundaria",
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
		estudiosCursados: "primaria, secundaria",
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

const Profile = () => {
	const auth = useContext(AuthContext);
	const userId = useParams().userId;

	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}

	let identifiedUser;
	if (auth.userType === "estudiante") {
		identifiedUser = dummy_users.find((u) => u.mail === userId);
	} else {
		identifiedUser = dummy_profesores.find((u) => u.mail === userId);
	}

	return <ProfileBody usuario={identifiedUser} />;
};

export default Profile;
