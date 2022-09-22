import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000/" });

export const getCursoPorId = (id) => {
	api.get(`/cursos?id=${id}`).then((res) => res.data);
};
