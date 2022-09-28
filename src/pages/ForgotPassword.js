import React from "react";
import {
	MDBContainer,
	MDBCol,
	MDBRow,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBCheckbox,
} from "mdb-react-ui-kit";

const ForgotPassword = () => {
	const handlePassChange = () => {
		alert("se cambio la password");
	};

	return (
		<MDBContainer fluid className="p-3 my-5">
			<MDBRow>
				<MDBCol col="10" md="6">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
						class="img-fluid"
						alt="Phone image"
					/>
				</MDBCol>

				<MDBCol col="4" md="6">
					<MDBInput
						wrapperClass="mb-4"
						label="Password"
						id="formControlLg"
						type="password"
						size="lg"
					/>
					<MDBInput
						wrapperClass="mb-4"
						label="Repeat Password"
						id="formControlLg"
						type="password"
						size="lg"
					/>

					<MDBBtn className="mb-4 w-100" size="lg" onClick={handlePassChange}>
						Change Password
					</MDBBtn>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default ForgotPassword;
