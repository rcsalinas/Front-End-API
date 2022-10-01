import React from "react";

import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Auxiliar from "../components/Auxiliar";
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
		const { data } = await axios.get(`http://localhost:8000/cursos?profesor=${userId}`);
		return data;
	}
	async function fetchCursosEstudiante() {
		const { data } = await axios.get(`http://localhost:8000/contrataciones?alumno=${userId}`);
		console.log(data);
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
		return <LoadingSpinner />;
	}

	if (auth.userType === "profesor") {
		return (
			<MDBCard
				shadow="0"
				border="light"
				background="white"
				className="mb-3"
				style={{ margin: "2% 2% 2% 2%" }}
			>
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
											<p className="fw-bold mb-1">{curso.nombreCurso}</p>
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
												value={curso.calificacion}
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
													<MDBDropdownItem link onClick={handleEliminar}>
														Eliminar
													</MDBDropdownItem>
													<NavLink to={`/cursos/update/${curso.id}`}>
														<MDBDropdownItem link>
															Modificar
														</MDBDropdownItem>
													</NavLink>

													<MDBDropdownItem link onClick={handlePublicar}>
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
				</MDBCardBody>
			</MDBCard>
		);
	}
	//esta se va a tener que modificar teniendo bien hecho el back
	return (
		<>
			<h4 style={{ marginTop: "2%", textAlign: "center" }}>Cursos del Estudiante:</h4>
			<h5 style={{ marginTop: "2%", textAlign: "center" }}>En curso:</h5>
			<div className="cursos-buscados">
				{cursosEstudiante.map((curso) => {
					if (curso.estadoContratacion && curso.estadoCurso) {
						return <Auxiliar key={curso.curso} cursoId={curso.curso} />;
					}
				})}
			</div>
			<h5 style={{ marginTop: "2%", textAlign: "center" }}>Finalizados:</h5>
			<div className="cursos-buscados" style={{ textDecoration: "none", marginBottom: "7%" }}>
				{cursosEstudiante.map((curso) => {
					if (curso.estadoContratacion && !curso.estadoCurso) {
						return <Auxiliar key={curso.curso} cursoId={curso.curso} />;
					}
				})}
			</div>
		</>
	);
};

export default MisCursos;
