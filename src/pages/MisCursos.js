import React from "react";

import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
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
	const queryClient = useQueryClient();
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

	const {
		mutate: finalizarC,
		isLoading: isLoadingFinalizarC,
		isError: isErrorFinalizarC,
		error: errorFinalizarC,
	} = useMutation(finalizarContratacion, {
		onSuccess: () => {
			queryClient.invalidateQueries(["contrataciones", auth.userId]);
		},
	});

	async function finalizarContratacion(c) {
		const { data } = await axios.patch(
			`http://localhost:5000/api/contrataciones/${c}/finalizar`,
			{},
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);
		return data;
	}

	const {
		mutate: publicar,
		isLoading: isLoadingPublicar,
		isError: isErrorPublicar,
		error: errorPublicar,
	} = useMutation(publicarCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos", auth.userId]);
			queryClient.invalidateQueries(["cursos"]);
		},
	});

	async function publicarCurso(idCurso) {
		const { data } = await axios.patch(
			`http://localhost:5000/api/cursos/${idCurso}/publicar`,
			{},
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);
		return data;
	}

	const {
		mutate: despublicar,
		isLoading: isLoadingDespublicar,
		isError: isErrorDespublicar,
		error: errorDespublicar,
	} = useMutation(despublicarCurso, {
		onSuccess: () => {
			queryClient.invalidateQueries(["cursos", auth.userId]);
			queryClient.invalidateQueries(["cursos"]);
		},
	});

	async function despublicarCurso(idCurso) {
		const { data } = await axios.patch(
			`http://localhost:5000/api/cursos/${idCurso}/despublicar`,
			{},
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);
		return data;
	}

	async function fetchCursosProfesor() {
		const { data } = await axios.get(`http://localhost:5000/api/cursos/user/${userId}`, {
			headers: {
				Authorization: "Bearer " + auth.token,
			},
		});
		return data;
	}
	async function fetchCursosEstudiante() {
		const { data } = await axios.get(
			`http://localhost:5000/api/contrataciones/user/${userId}`,
			{
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			}
		);

		return data;
	}

	const handleEliminar = () => {
		alert("eliminado");
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

	if (
		isLoadingCursosProfe ||
		isLoadingFinalizarC ||
		isLoadingCursosEstudiante ||
		isLoadingDespublicar ||
		isLoadingPublicar
	) {
		return <LoadingSpinner asOverlay />;
	}
	if (isErrorCursosProfe) {
		return <div>Error! {errorCursosProfe.message}</div>;
	}
	if (isErrorCursosEstudiante) {
		return <div>Error! {errorCursosEstudiante.message}</div>;
	}
	if (isErrorFinalizarC) {
		return <div>Error! {errorFinalizarC.message}</div>;
	}
	if (isErrorPublicar) {
		return <div>Error! {errorPublicar.message}</div>;
	}
	if (isErrorDespublicar) {
		return <div>Error! {errorDespublicar.message}</div>;
	}

	if (auth.userType === "profesor") {
		return (
			<section style={{ padding: "5%", height: "100vh" }}>
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
					<MDBTable align="middle" responsive>
						<MDBTableHead>
							<tr>
								<th scope="col">Materia</th>
								<th scope="col">Duracion</th>
								<th scope="col">Frecuencia</th>
								<th scope="col">Tipo</th>

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
											{curso.estadoContratacion && (
												<MDBBadge color="success" pill size="mx-2">
													En curso
												</MDBBadge>
											)}
											{(!curso.estadoContratacion || !curso.curso.estado) && (
												<MDBBadge color="warning" pill>
													Finalizado
												</MDBBadge>
											)}
										</td>

										<td>
											{curso.estadoContratacion && curso.curso.estado && (
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
											{(!curso.estadoContratacion || !curso.curso.estado) && (
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
