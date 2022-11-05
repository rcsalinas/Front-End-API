import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import * as api from "../MiAppApi";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
	let navigate = useHistory();
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const userId = useParams().userId;
	const token = useParams().token;

	const { mutate, error, isLoading, isError } = useMutation(api.resetPassword, {
		onSuccess: () => {
			navigate.push(`/auth`);
		},
	});

	const handlePassChange = (event) => {
		setPassword(event.target.value);
	};
	const handlePassChange2 = (event) => {
		setPassword2(event.target.value);
	};

	const handleSubmit = () => {
		if (password !== password2) {
			alert("Contraseñas no son iguales. Intente de nuevo!");
		} else {
			mutate({ userId: userId, token: token, password: password });
		}
	};

	if (isLoading) {
		return <LoadingSpinner asOverlay />;
	}

	if (isError) {
		return <div> ${error.message}</div>;
	}

	return (
		<MDBContainer fluid className="p-3 my-5">
			<MDBRow>
				<MDBCol col="10" md="6">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
						className="img-fluid"
						alt="Phone "
					/>
				</MDBCol>

				<MDBCol col="4" md="6">
					<MDBInput
						wrapperClass="mb-4"
						label="New Password"
						type="password"
						size="lg"
						value={password}
						onChange={handlePassChange}
					/>
					<MDBInput
						wrapperClass="mb-4"
						label="Repeat Password"
						type="password"
						size="lg"
						value={password2}
						onChange={handlePassChange2}
					/>

					<MDBBtn className="mb-4 w-100" size="lg" onClick={handleSubmit}>
						Change Password
					</MDBBtn>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default ResetPassword;
