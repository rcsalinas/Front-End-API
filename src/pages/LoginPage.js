import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import LoginForm from "../components/FormElements/LoginForm";

import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";

const LoginPage = () => {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();

	const { mutate, error, isLoading, isError } = useMutation(loginUser, {
		onSuccess: (data) => {
			auth.login(data.userId, data.token, data.tipo);
			queryClient.setQueryData(["usuario", data.userId], data);
		},
	});

	async function loginUser(payload) {
		const { data } = await axios.post(`http://localhost:5000/api/users/login`, payload);
		return data;
	}

	const handleLogin = (email, password) => {
		mutate({
			email: email,
			password: password,
		});
	};

	if (isError) {
		alert(error);
	}
	if (isLoading) {
		<LoadingSpinner asOverlay />;
	}

	return <LoginForm handleLogin={handleLogin} />;
};

export default LoginPage;
