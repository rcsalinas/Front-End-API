import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { MDBBtn } from "mdb-react-ui-kit";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdb-react-ui-kit";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";
import { Rating } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "../components/Cursos/Cursos.css";

import * as api from "../MiAppApi";

const MisCursos = () => {
	const auth = useContext(AuthContext);
	const userId = useParams().userId;
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [cId, setCId] = useState("");
	const {
		data: cursosProfe,
		error: errorCursosProfe,
		isError: isErrorCursosProfe,
		isLoading: isLoadingCursosProfe,
	} = useQuery(["cursos", auth.userId], () => api.fetchCursosPorUserId(userId), {
		enabled: auth.userType === "profesor",
	});

	const {
		data: cursosEstudiante,
		error: errorCursosEstudiante,
		isError: isErrorCursosEstudiante,
		isLoading: isLoadingCursosEstudiante,
	} = useQuery(["contrataciones", auth.userId], api.fetchContrataciones, {
		enabled: auth.userType === "estudiante",
	});
	console.log(cursosEstudiante);

	const {
		mutate: finalizarC,
		isLoading: isLoadingFinalizarC,
		isError: isErrorFinalizarC,
		error: errorFinalizarC,
	} = useMutation(api.finalizarContratacion, {
		onSuccess: () => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});

	const {
		mutate: publicar,
		isLoading: isLoadingPublicar,
		isError: isErrorPublicar,
		error: errorPublicar,
	} = useMutation(api.publicarCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos", auth.userId]);
			queryClient.invalidateQueries(["cursos"]);
		},
	});

	const {
		mutate: despublicar,
		isLoading: isLoadingDespublicar,
		isError: isErrorDespublicar,
		error: errorDespublicar,
	} = useMutation(api.despublicarCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos", auth.userId]);
			queryClient.invalidateQueries(["cursos"]);
		},
	});

	const {
		mutate: eliminarCurso,
		isLoading: isLoadingEliminarCurso,
		isError: isErrorEliminarCurso,
		error: errorEliminarCurso,
	} = useMutation(api.deleteClass, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos", auth.userId]);
		},
	});

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const handleEliminar = () => {
		eliminarCurso(cId);
		setOpen(false);
	};
	const handlePublicar = (estado, id) => {
		if (estado) {
			despublicar(id);
		} else {
			publicar(id);
		}
	};
	const handleFinalizarContratacionAlumno = (id) => {
		finalizarC(id);
	};

	const handleClose = () => setOpen(false);

	const handleOpen = (id) => {
		setOpen(true);
		setCId(id);
	};

	if (
		isLoadingCursosProfe ||
		isLoadingFinalizarC ||
		isLoadingCursosEstudiante ||
		isLoadingDespublicar ||
		isLoadingPublicar ||
		isLoadingEliminarCurso
	) {
		return <LoadingSpinner asOverlay />;
	}
	if (isErrorCursosProfe) {
		return <div>Error! {errorCursosProfe.response.data.message}</div>;
	}
	if (isErrorCursosEstudiante) {
		return <div>Error! {errorCursosEstudiante.response.data.message}</div>;
	}
	if (isErrorFinalizarC) {
		return <div>Error! {errorFinalizarC.response.data.message}</div>;
	}
	if (isErrorPublicar) {
		return <div>Error! {errorPublicar.response.data.message}</div>;
	}
	if (isErrorDespublicar) {
		return <div>Error! {errorDespublicar.response.data.message}</div>;
	}
	if (isErrorEliminarCurso) {
		return <div>Error! {errorEliminarCurso.response.data.message}</div>;
	}

	if (auth.userType === "profesor") {
		return (
			<section style={{ padding: "5%", height: "100vh" }}>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Seguro que quiere eliminar el curso?
						</Typography>

						<MDBBtn
							outline
							rounded
							className="mx-2"
							color="danger"
							onClick={handleEliminar}
							style={{ marginTop: "3%" }}
						>
							Eliminar
						</MDBBtn>
					</Box>
				</Modal>

				<MDBCard>
					<MDBCardHeader>Cursos del profesor</MDBCardHeader>
					<MDBCardBody>
						<MDBTable align="middle" responsive>
							<MDBTableHead>
								<tr>
									<th scope="col">Materia</th>
									<th scope="col">Duracion</th>
									<th scope="col">Frecuencia</th>
									<th scope="col">Tipo</th>
									<th scope="col">Rating</th>
									<th scope="col">Estado</th>
									<th scope="col"> Accion</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody>
								{cursosProfe.map((curso) => {
									return (
										<tr>
											<td>
												<NavLink
													to={`/cursos/${curso.id}`}
													style={{
														textDecoration: "none",
														color: "black",
													}}
												>
													<p className="fw-bold mb-1">{curso.nombre}</p>
												</NavLink>
											</td>
											<td>
												<p className="fw-normal mb-1">{curso.duracion}</p>
											</td>
											<td>
												<p className="fw-normal mb-1">{curso.frecuencia}</p>
											</td>
											<td>
												<p className="fw-normal mb-1">{curso.tipo}</p>
											</td>
											<td>
												<Rating
													name="read-only"
													value={curso.rating}
													readOnly
												/>
											</td>
											<td>
												{curso.estado && (
													<MDBBadge color="success" pill>
														publicado
													</MDBBadge>
												)}
												{!curso.estado && (
													<MDBBadge color="warning" pill>
														inactivo
													</MDBBadge>
												)}
											</td>

											<td>
												<MDBDropdown group className="shadow-0">
													<MDBDropdownToggle color="light">
														Action
													</MDBDropdownToggle>
													<MDBDropdownMenu>
														<MDBDropdownItem
															link
															onClick={() => handleOpen(curso.id)}
														>
															Eliminar
														</MDBDropdownItem>
														<NavLink to={`/cursos/update/${curso.id}`}>
															<MDBDropdownItem link>
																Modificar
															</MDBDropdownItem>
														</NavLink>

														<MDBDropdownItem
															link
															onClick={() =>
																handlePublicar(
																	curso.estado,
																	curso.id
																)
															}
														>
															{curso.estado
																? "Despublicar"
																: "Publicar"}
														</MDBDropdownItem>
													</MDBDropdownMenu>
												</MDBDropdown>
											</td>
										</tr>
									);
								})}
							</MDBTableBody>
						</MDBTable>
						<NavLink to="/cursos/nuevo" style={{ textDecoration: "none" }}>
							<div
								className="d-grid gap-2 col-6 mx-auto"
								style={{ marginBottom: "5%", marginTop: "5%" }}
							>
								<MDBBtn>Crear Curso</MDBBtn>
							</div>
						</NavLink>
					</MDBCardBody>
				</MDBCard>
			</section>
		);
	}

	return (
		<section style={{ padding: "2%", height: "100vh" }}>
			<MDBCard>
				<MDBCardHeader>Cursos del Alumno</MDBCardHeader>
				<MDBCardBody>
					<MDBTable align="middle" responsive>
						<MDBTableHead>
							<tr>
								<th scope="col">Materia</th>
								<th scope="col">Duracion</th>
								<th scope="col">Frecuencia</th>
								<th scope="col">Tipo</th>

								<th scope="col">Contratacion</th>
								<th scope="col"> Accion</th>
							</tr>
						</MDBTableHead>
						<MDBTableBody>
							{cursosEstudiante.map((curso) => {
								return (
									<tr>
										<td>
											<NavLink
												to={`/cursos/${curso.curso.id}`}
												style={{ textDecoration: "none", color: "black" }}
											>
												<p className="fw-bold mb-1">{curso.curso.nombre}</p>
											</NavLink>
										</td>
										<td>
											<p className="fw-normal mb-1">{curso.curso.duracion}</p>
										</td>
										<td>
											<p className="fw-normal mb-1">
												{curso.curso.frecuencia}
											</p>
										</td>
										<td>
											<p className="fw-normal mb-1">{curso.curso.tipo}</p>
										</td>

										<td>
											{curso.estadoContratacion === "Aceptada" && (
												<MDBBadge color="success" pill size="mx-2">
													En curso
												</MDBBadge>
											)}
											{curso.estadoContratacion === "Finalizada" && (
												<MDBBadge color="success" pill size="mx-2">
													Finalizada
												</MDBBadge>
											)}
											{curso.estadoContratacion === "Rechazada" && (
												<MDBBadge color="danger" pill size="mx-2">
													Rechazada
												</MDBBadge>
											)}
											{curso.estadoContratacion === "Espera" && (
												<MDBBadge color="warning" pill size="mx-2">
													En espera
												</MDBBadge>
											)}
										</td>

										<td>
											{curso.estadoContratacion === "Aceptada" && (
												<MDBBtn
													className="mx-2"
													color="danger"
													onClick={() =>
														handleFinalizarContratacionAlumno(curso.id)
													}
													rounded
													size="sm"
												>
													Finalizar
												</MDBBtn>
											)}
											{(curso.estadoContratacion === "Finalizada" ||
												curso.estadoContratacion === "Espera" ||
												!curso.curso.estado) && (
												<MDBBtn
													className="mx-2"
													color="danger"
													disabled
													rounded
													size="sm"
												>
													Finalizar
												</MDBBtn>
											)}
										</td>
									</tr>
								);
							})}
						</MDBTableBody>
					</MDBTable>
				</MDBCardBody>
			</MDBCard>
		</section>
	);
};

export default MisCursos;
