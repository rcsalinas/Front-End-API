import React from "react";

import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Redirect } from "react-router-dom";

const Notificaciones = () => {
	const auth = useContext(AuthContext);
	if (!auth.isLoggedIn) {
		//sino esta logueado no puede ver perfil
		return <Redirect to="/auth" />;
	}
};

export default Notificaciones;
