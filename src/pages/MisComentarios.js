import React from "react";

import {
	MDBCard,
	MDBCardImage,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBRow,
	MDBCol,
	MDBCardHeader,
} from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";

import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import * as api from "../MiAppApi";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";

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

const MisComentarios = () => {
	const auth = useContext(AuthContext);
	const [open, setOpen] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const queryClient = useQueryClient();
	const [idComentario, setIdComentario] = React.useState("");
	const [nuevoComentario, setNuevoComentario] = React.useState("");
	const [nuevoRating, setNuevoRating] = React.useState(0);

	const { data, error, isError, isLoading } = useQuery(
		["comentarios", auth.userId],
		api.fetchComentariosByUser
	);

	const {
		mutate: borrarComentario,
		isLoading: isLoadingBorrarComentario,
		isError: isErrorBorrarComentario,
		error: errorBorrarComentario,
	} = useMutation(api.deleteCalificacion, {
		onSuccess: () => {
			queryClient.invalidateQueries(["comentarios", auth.userId]);
		},
	});

	const {
		mutate: editarComentario,
		isLoading: isLoadingEditarComentario,
		isError: isErrorEditar,
		error: errorEditar,
	} = useMutation(api.editarComentario, {
		onSuccess: () => {
			queryClient.invalidateQueries(["comentarios", auth.userId]);
		},
	});
	if (isLoading || isLoadingBorrarComentario || isLoadingEditarComentario) {
		return <LoadingSpinner asOverlay />;
	}

	if (isError) {
		return <div>{error.response.data.message}</div>;
	}
	if (isErrorBorrarComentario) {
		return <div>{errorBorrarComentario.response.data.message}</div>;
	}
	if (isErrorEditar) {
		return <div>{errorEditar.response.data.message}</div>;
	}

	const handleOpen = (idComentario) => {
		setIdComentario(idComentario);
		setOpen(true);
	};

	const handleOpenEdit = (idComentario) => {
		setIdComentario(idComentario);
		setOpenEdit(true);
	};

	const handleClose = () => setOpen(false);
	const handleCloseEdit = () => setOpenEdit(false);

	const handleEliminar = () => {
		borrarComentario(idComentario);
		handleClose();
	};

	const handleEditarComentario = () => {
		editarComentario({
			comentarioId: `${idComentario}`,
			rating: `${nuevoRating}`,
			comentario: `${nuevoComentario}`,
		});
		handleCloseEdit();
	};

	const handleNuevoComentarioChange = (event) => {
		setNuevoComentario(event.target.value);
	};

	if (data.length > 0) {
		return (
			<MDBCard background="white" className="mb-3" style={{ margin: "2% 2% 2% 2%" }}>
				<Modal
					open={openEdit}
					onClose={handleCloseEdit}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<MDBTextArea
							value={nuevoComentario}
							id="textAreaExample"
							rows={4}
							onChange={handleNuevoComentarioChange}
						/>
						<Typography variant="h6" color="text.secondary">
							Nuevo Rating
						</Typography>
						<div>
							<Rating
								name="simple-controlled"
								value={nuevoRating}
								onChange={(event, newValue) => {
									setNuevoRating(newValue);
								}}
							/>
						</div>

						<MDBBtn
							outline
							rounded
							className="mx-2"
							color="warning"
							onClick={handleEditarComentario}
							style={{ marginTop: "3%" }}
						>
							Editar Comentario
						</MDBBtn>
					</Box>
				</Modal>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Esta seguro que quiere eliminar su comentario?
						</Typography>

						<MDBBtn
							outline
							rounded
							className="mx-2"
							color="danger"
							style={{ marginTop: "3%" }}
							onClick={handleEliminar}
						>
							Eliminar Comentario
						</MDBBtn>
					</Box>
				</Modal>
				<MDBCardHeader>Mis Comentarios</MDBCardHeader>
				<MDBCardBody>
					<MDBRow className="row-cols-1 row-cols-md-4 g-4">
						{data.map((comentario) => {
							return (
								<MDBCol>
									<MDBCard className="h-100">
										<MDBCardImage
											src={`http://localhost:5000/${comentario.curso.image}`}
											alt="..."
											position="top"
											style={{ maxHeight: "250px" }}
										/>
										<MDBCardBody>
											<MDBCardTitle>{comentario.curso.nombre}</MDBCardTitle>
											<MDBCardText>{comentario.comentario}</MDBCardText>
											<Typography variant="h6" color="text.secondary">
												<Rating
													name="read-only"
													value={comentario.rating}
													readOnly
												/>
											</Typography>
											<div className="d-flex flex-row  justify-content-evenly flex-wrap">
												<MDBBtn
													onClick={() => handleOpenEdit(comentario.id)}
												>
													Editar
												</MDBBtn>
												<MDBBtn
													color="danger"
													onClick={() => handleOpen(comentario.id)}
												>
													Eliminar
												</MDBBtn>
											</div>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
							);
						})}
					</MDBRow>
				</MDBCardBody>
			</MDBCard>
		);
	} else {
		return (
			<section style={{ padding: "2%", height: "100vh" }}>
				<MDBCard background="white" className="mb-3" style={{ margin: "2% 2% 2% 2%" }}>
					<MDBCardHeader>Mis Comentarios</MDBCardHeader>
					<MDBCardBody>
						<MDBCardText>Usted no ha creado comentarios</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</section>
		);
	}
};

export default MisComentarios;
