import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/",
});

export async function registerUser(payload) {
	const { data } = await api.post(
		`/api/users/signUp`,

		payload,
		{ headers: { "Content-Type": "multipart/form-data" } }
	);
	return data;
}
export async function loginUser(payload) {
	const { data } = await api.post(`/api/users/login`, payload);
	return data;
}

export async function fetchContrataciones() {
	const { data } = await api.get(
		`/api/contrataciones/user/${JSON.parse(localStorage.getItem("userData")).userId}`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);

	return data;
}

export async function fetchContratacionPorCurso(cursoId) {
	const { data } = await api.get(
		`/api/contrataciones/user/${
			JSON.parse(localStorage.getItem("userData")).userId
		}/${cursoId}`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);

	return data;
}

export async function aceptarContratacion(id) {
	const { data } = await api.patch(
		`/api/contrataciones/${id}/aceptar`,
		{},
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}
export async function rechazarContratacion(id) {
	const { data } = await api.delete(
		`/api/contrataciones/${id}/rechazar`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		},
		{}
	);
	return data;
}

export async function crearContratacion(payload) {
	const { data } = await api.post(`/api/contrataciones/${payload.cursoId}`, payload, {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
		},
	});
	return data;
}

export async function crearCurso(payload) {
	const { data } = await api.post(
		`/api/cursos/`,

		payload,

		{
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function fetchCursoPorId(cursoId) {
	const { data } = await api.get(`/api/cursos/${cursoId}`);
	return data;
}

export async function fetchCursos() {
	const { data } = await api.get(`/api/cursos`);
	return data;
}

export async function sendNotificacion(payload) {
	const { data } = await api.post(`/api/notificaciones`, payload, {
		headers: {
			Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
		},
	});
	return data;
}
export async function deleteNotificacion(id) {
	const { data } = await api.delete(
		`/api/notificaciones/${id}`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		},
		{}
	);
	return data;
}

export async function aprobarCalificacion(id) {
	const { data } = await api.patch(
		`api/calificaciones/${id}/aceptar`,
		{
			estado: true,
		},
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function rechazarCalificacion(idCalificacion) {
	const { data } = await api.delete(
		`/api/calificaciones/${idCalificacion}/rechazar`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		},
		{}
	);
	return data;
}
export async function deleteCalificacion(idCalificacion) {
	const { data } = await api.delete(
		`/api/calificaciones/${idCalificacion}/eliminar`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		},
		{}
	);
	return data;
}

export async function fetchNotificaciones() {
	const { data } = await api.get(
		`/api/notificaciones/${JSON.parse(localStorage.getItem("userData")).userId}`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function fetchComentariosByUser() {
	const { data } = await api.get(
		`api/calificaciones/${JSON.parse(localStorage.getItem("userData")).userId}`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function fetchUserPerfil() {
	const { data } = await api.get(
		`/api/users/${JSON.parse(localStorage.getItem("userData")).userId}`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);

	return data;
}

export async function editarComentario(payload) {
	const { data } = await api.patch(
		`/api/calificaciones/${payload.comentarioId}/editar`,
		payload,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function updateCurso(payload) {
	const { data } = await api.patch(`/api/cursos/${payload.get("cursoId")}`, payload, {
		mode: "same-origin",
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
		},
	});
	return data;
}

export async function finalizarContratacion(c) {
	const { data } = await api.patch(
		`/api/contrataciones/${c}/finalizar`,
		{},
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function publicarCurso(idCurso) {
	const { data } = await api.patch(
		`/api/cursos/${idCurso}/publicar`,
		{},
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function deleteClass(idCurso) {
	const { data } = await api.delete(
		`/api/cursos/${idCurso}/eliminar`,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		},
		{}
	);
	return data;
}

export async function despublicarCurso(idCurso) {
	const { data } = await api.patch(
		`/api/cursos/${idCurso}/despublicar`,
		{},
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
			},
		}
	);
	return data;
}

export async function fetchCursosPorUserId(userId) {
	const { data } = await api.get(`/api/cursos/user/${userId}`, {
		headers: {
			Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
		},
	});
	return data;
}

export async function updateUser(payload) {
	const { data } = await api.patch(
		`/api/users/${JSON.parse(localStorage.getItem("userData")).userId}`,
		payload,
		{
			headers: {
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return data;
}

export async function submitReview(payload) {
	const { data } = await api.post(`/api/calificaciones`, payload, {
		headers: {
			Authorization: "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
		},
	});
	return data;
}

export async function sendRecoveryEmail(payload) {
	const { data } = await api.post(`/api/users/forgot-password`, payload);
	return data;
}
export async function resetPassword(payload) {
	const { data } = await api.post(`/api/users/reset-password`, payload);
	return data;
}
