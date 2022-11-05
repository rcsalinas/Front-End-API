import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import * as api from "../MiAppApi";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
	let navigate = useHistory();
	const [email, setEmail] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const { mutate, error, isLoading, isError } = useMutation(api.sendRecoveryEmail, {
		onSuccess: () => {
			navigate.push(`/auth`);
		},
	});

	const handlePassChange = () => {
		mutate({ email });
	};

	if (isLoading) {
		return <LoadingSpinner asOverlay />;
	}

	if (isError) {
		return <div>${error.message}</div>;
	}

	return (
		<MDBContainer fluid className="p-3 my-5">
			<MDBRow>
				<MDBCol col="10" md="6">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
						className="img-fluid"
						alt="Phone"
					/>
				</MDBCol>

				<MDBCol col="4" md="6">
					<MDBRow>
						<MDBCol md="6">
							<MDBInput
								wrapperClass="mb-4"
								label="Email"
								id="form3"
								type="Email"
								value={email}
								onChange={handleEmailChange}
							/>
						</MDBCol>
					</MDBRow>

					<MDBBtn className="mb-4 " size="md" onClick={handlePassChange}>
						Send Recovery Email
					</MDBBtn>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default ForgotPassword;
