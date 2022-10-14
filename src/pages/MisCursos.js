import React from "react";

import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { MDBBtn } from "mdb-react-ui-kit";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBCard, MDBCardBody, MDBCardHeader } from "mdb-react-ui-kit";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";
import { Rating } from "@mui/material";

import "../components/Cursos/Cursos.css";

const MisCursos = () => {
	const auth = useContext(AuthContext);
	const userId = useParams().userId;

	const {
		data: cursosProfe,
		error: errorCursosProfe,
		isError: isErrorCursosProfe,
		isLoading: isLoadingCursosProfe,
	} = useQuery(["cursos", auth.userId], fetchCursosProfesor, {
		enabled: auth.userType === "profesor",
	});

	const {
		data: cursosEstudiante,
		error: errorCursosEstudiante,
		isError: isErrorCursosEstudiante,
		isLoading: isLoadingCursosEstudiante,
	} = useQuery(["contrataciones", auth.userId], fetchCursosEstudiante, {
		enabled: auth.userType === "estudiante",
	});

	async function fetchCursosProfesor() {
		const { data } = await axios.get(`http://localhost:5000/api/cursos/user/${userId}`);
		return data;
	}
	async function fetchCursosEstudiante() {
		const { data } = await axios.get(`http://localhost:8000/contrataciones?alumno=${userId}`);

		return data;
	}

	const handleEliminar = () => {
		alert("eliminado");
	};
	const handlePublicar = () => {
		alert("publicado");
	};
	const handleDespublicar = () => {
		alert("despublicado");
	};
	const handleFinalizar = () => {
		alert("finalizado");
	};

	if (isLoadingCursosProfe) {
		return <LoadingSpinner />;
	}
	if (isErrorCursosProfe) {
		return <div>Error! {errorCursosProfe.message}</div>;
	}
	if (isErrorCursosEstudiante) {
		return <div>Error! {errorCursosEstudiante.message}</div>;
	}
	if (isLoadingCursosEstudiante) {
		return <LoadingSpinner asOverlay />;
	}

	if (auth.userType === "profesor") {
		return (
			<section style={{ padding: "5%", height: "100vh" }}>
				<MDBCard>
					<MDBCardHeader>Cursos del profesor</MDBCardHeader>
					<MDBCardBody>
						<MDBTable align="middle">
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
															onClick={handleEliminar}
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
															onClick={handlePublicar}
														>
															Publicar
														</MDBDropdownItem>
														<MDBDropdownItem
															link
															onClick={handleDespublicar}
														>
															Despublicar
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
								style={{ marginBottom: "10%" }}
							>
								<MDBBtn>Crear Curso</MDBBtn>
							</div>
						</NavLink>
					</MDBCardBody>
				</MDBCard>
			</section>
		);
	}
	//esta se va a tener que modificar teniendo bien hecho el back
	return (
		<section style={{ padding: "2%", height: "100vh" }}>
			<MDBCard>
				<MDBCardHeader>Cursos del Alumno</MDBCardHeader>
				<MDBCardBody>
					<MDBTable align="middle">
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
							{cursosEstudiante.map((curso) => {
								return (
									<tr>
										<td>
											<NavLink
												to={`/cursos/${curso.curso}`}
												style={{ textDecoration: "none", color: "black" }}
											>
												<p className="fw-bold mb-1">{curso.curso}</p>
											</NavLink>
										</td>
										<td>
											<p className="fw-normal mb-1">7</p>
										</td>
										<td>
											<p className="fw-normal mb-1">7</p>
										</td>
										<td>
											<p className="fw-normal mb-1">7</p>
										</td>
										<td>
											<Rating name="read-only" value={5} readOnly />
										</td>
										<td>
											{curso.estadoCurso && (
												<MDBBadge color="success" pill size="mx-2">
													En curso
												</MDBBadge>
											)}
											{!curso.estadoCurso && (
												<MDBBadge color="warning" pill>
													Finalizado
												</MDBBadge>
											)}
										</td>

										<td>
											{curso.estadoCurso && (
												<MDBBtn
													className="mx-2"
													color="danger"
													onClick={handleFinalizar}
													rounded
													size="sm"
												>
													Finalizar
												</MDBBtn>
											)}
											{!curso.estadoCurso && (
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
