import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import LoginForm from "../components/FormElements/LoginForm";

const LoginPage = () => {
	const auth = useContext(AuthContext);

	const handleLogin = () => {};

	return <LoginForm handleLogin={handleLogin} />;
};

export default LoginPage;
