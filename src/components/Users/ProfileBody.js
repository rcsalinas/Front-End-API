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
	const auth = useContext(AuthContext);
	const {
		nombre,
		apellido,
		mail,
		celular,
		fechaNacimiento,
		estudiosCursados,
		titulo,
		experiencia,
		image,
	} = props;
	return (
		<section style={{ backgroundColor: "#eee" }}>
			<MDBContainer className="py-5">
				<MDBRow>
					<MDBCol lg="4">
						<MDBCard className="mb-4">
							<MDBCardBody className="text-center">
								<MDBCardImage
									src={image}
									alt="avatar"
									className="rounded-circle"
									style={{ width: "150px" }}
									fluid
								/>
								<p className="text-muted mb-1">{nombre}</p>
								<p className="text-muted mb-4">{auth.userType}</p>
								<div className="d-flex justify-content-center mb-2">
									<NavLink
										to={`/users/${auth.userId}`}
										exact
										style={{ textDecoration: "none" }}
									>
										<MDBBtn>Editar Perfil</MDBBtn>
									</NavLink>
									<NavLink
										to={`/${auth.userId}/cursos`}
										style={{ textDecoration: "none", marginLeft: "1%" }}
									>
										<MDBBtn>Mis Cursos</MDBBtn>
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
										<MDBCardText className="text-muted">{nombre}</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Apellido</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">{apellido}</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Telefono</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">{celular}</MDBCardText>
									</MDBCol>
								</MDBRow>
								<hr />
								<MDBRow>
									<MDBCol sm="3">
										<MDBCardText>Mail</MDBCardText>
									</MDBCol>
									<MDBCol sm="9">
										<MDBCardText className="text-muted">{mail}</MDBCardText>
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
													{fechaNacimiento}
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
													{estudiosCursados.map((item) => {
														return item + " ";
													})}
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
													{titulo}
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
													{experiencia}
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
