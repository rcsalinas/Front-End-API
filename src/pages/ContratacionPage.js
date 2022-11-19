import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBInput,
	MDBIcon,
} from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";

import { useQueryClient, useMutation } from "react-query";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import * as api from "../MiAppApi";

const ContratacionPage = () => {
	let navigate = useHistory();
	const queryClient = useQueryClient();
	const [telefono, setTelefono] = React.useState("");
	const [mail, setMail] = React.useState("");
	const [motivacion, setMotivacion] = React.useState("");
	const [horario, setHorario] = React.useState("");
	const auth = useContext(AuthContext);
	const cursoId = useParams().cursoId;
	const profesorId = useParams().userId;

	const { mutate, isLoading, isError, error } = useMutation(api.crearContratacion, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user", auth.userId]);
			queryClient.invalidateQueries(["contrataciones"]);
			alert("Solicitud enviada con exito");
			navigate.push("/");
		},
	});

	const handleSubmit = (event) => {
		event.preventDefault();

		mutate({
			motivacion: `${motivacion}`,
			profesor: `${profesorId}`,
			email: `${mail}`,
			telefono: `${telefono}`,
			horario: `${horario}`,
			cursoId: cursoId,
		});
	};
	if (isLoading) {
		return <LoadingSpinner asOverlay />;
	}
	if (isError) {
		alert(error.response.data.message);
		navigate.push("/");
	}
	const handleTelefonoChange = (event) => {
		setTelefono(event.target.value);
	};
	const handleMailChange = (event) => {
		setMail(event.target.value);
	};
	const handleMotivacionChange = (event) => {
		setMotivacion(event.target.value);
	};
	const handleHorarioChange = (event) => {
		setHorario(event.target.value);
	};

	return (
		<MDBContainer fluid style={{ marginBottom: "20%" }}>
			<MDBCard
				className="text-black m-5"
				style={{ borderRadius: "25px", marginBottom: "5%" }}
			>
				<MDBCardBody>
					<MDBRow>
						<MDBCol
							md="10"
							lg="6"
							className="order-2 order-lg-1 d-flex flex-column align-items-center"
						>
							<form onSubmit={handleSubmit}>
								<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
									Adjuntar Datos
								</p>

								<div className="d-flex flex-row align-items-center mb-4 ">
									<MDBIcon fas icon="user me-3" size="lg" />
									<MDBInput
										label="Telefono"
										id="typePhone"
										type="tel"
										placeholder="541166784884"
										value={telefono}
										onChange={handleTelefonoChange}
									/>
								</div>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="envelope me-3" size="lg" />
									<MDBInput
										label="Your Email"
										id="form2"
										type="email"
										placeholder="email@example.com"
										value={mail}
										onChange={handleMailChange}
									/>
								</div>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="lock me-3" size="lg" />
									<MDBInput
										label="Horario Contacto"
										id="typeText"
										type="text"
										placeholder="10AM - 6PM"
										value={horario}
										onChange={handleHorarioChange}
									/>
								</div>

								<div className="d-flex flex-row align-items-center mb-4">
									<MDBIcon fas icon="key me-3" size="lg" />
									<MDBTextArea
										label="Motivo de interes"
										id="textAreaExample"
										rows={4}
										value={motivacion}
										onChange={handleMotivacionChange}
									/>
								</div>

								<MDBBtn
									className="mb-4"
									size="lg"
									type="submit"
									style={{ marginLeft: "5%" }}
								>
									Solicitar
								</MDBBtn>
							</form>
						</MDBCol>

						<MDBCol
							md="10"
							lg="6"
							className="order-1 order-lg-2 d-flex align-items-center"
						>
							<MDBCardImage
								src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
								fluid
							/>
						</MDBCol>
					</MDBRow>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};

export default ContratacionPage;
