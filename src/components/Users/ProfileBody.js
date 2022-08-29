import React from "react";
import {
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardText,
	MDBCardBody,
	MDBCardImage,
	MDBBtn,
} from "mdb-react-ui-kit";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from "react-router-dom";

const ProfileBody = (props) => {
	const { usuario } = props;
	const auth = useContext(AuthContext);
	return (
		<section style={{ backgroundColor: "#eee" }}>
			<MDBContainer className="py-5">
				<MDBRow>
					<MDBCol lg="4">
						<MDBCard className="mb-4">
							<MDBCardBody className="text-center">
								<MDBCardImage
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle"
									style={{ width: "150px" }}
									fluid
								/>
								<p className="text-muted mb-1">{usuario.estudiosCursados}</p>
								<p className="text-muted mb-4">{usuario.celular}</p>
								<div className="d-flex justify-content-center mb-2">
									<NavLink
										to="/updateUser"
										exact
										style={{ textDecoration: "none" }}
									>
										<MDBBtn>Editar Perfil</MDBBtn>
									</NavLink>
								</div>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol lg="8">
						<MDBCard className="mb-4">
							<MDBCardBody>
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Nombre</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">
											{usuario.nombre}
										</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Apellido</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">
											{usuario.apellido}
										</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Telefono</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">
											{usuario.celular}
										</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Mail</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">
											{usuario.mail}
										</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Tipo de Usuario</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">
											{auth.userType}
										</MDBCardText>
									</MDBCol>
								</MDBRow>
								{auth.userType === "estudiante" && (
									<>
										<hr />
										<MDBRow>
											<MDBCol sm="3">
												<MDBCardText>Fecha de Nacimiento</MDBCardText>
											</MDBCol>
											<MDBCol sm="9">
												<MDBCardText className="text-muted">
													{usuario.fechaNacimiento}
												</MDBCardText>
											</MDBCol>
										</MDBRow>
										<hr />
										<MDBRow>
											<MDBCol sm="3">
												<MDBCardText>Estudios Cursados</MDBCardText>
											</MDBCol>
											<MDBCol sm="9">
												<MDBCardText className="text-muted">
													{usuario.estudiosCursados}
												</MDBCardText>
											</MDBCol>
										</MDBRow>
									</>
								)}
								{auth.userType === "profesor" && (
									<>
										<hr />
										<MDBRow>
											<MDBCol sm="3">
												<MDBCardText>Titulo</MDBCardText>
											</MDBCol>
											<MDBCol sm="9">
												<MDBCardText className="text-muted">
													{usuario.titulo}
												</MDBCardText>
											</MDBCol>
										</MDBRow>
										<hr />
										<MDBRow>
											<MDBCol sm="3">
												<MDBCardText>Experiencia</MDBCardText>
											</MDBCol>
											<MDBCol sm="9">
												<MDBCardText className="text-muted">
													{usuario.experiencia}
												</MDBCardText>
											</MDBCol>
										</MDBRow>
									</>
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
};

export default ProfileBody;
