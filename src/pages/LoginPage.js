import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import LoginForm from "../components/FormElements/LoginForm";

import { useQueryClient, useMutation } from "react-query";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import * as api from "../MiAppApi";

const LoginPage = () => {
	const auth = useContext(AuthContext);
	const queryClient = useQueryClient();

	const { mutate, error, isLoading, isError } = useMutation(api.loginUser, {
		onSuccess: (data) => {
			auth.login(data.userId, data.token, data.tipo);
			queryClient.setQueryData(["usuario", data.userId], data);
		},
	});

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
