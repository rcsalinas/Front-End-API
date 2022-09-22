import React from "react";

import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import CursoCard from "./Cursos/CursoCard/CursoCard";

const Auxiliar = (props) => {
	const { cursoId, cursoEstado } = props;
	console.log(cursoId);
	const { data, error, isError, isLoading } = useQuery(["cursoPorId", cursoId], fetchCursoPorId);

	async function fetchCursoPorId() {
		const { data } = await axios.get(`http://localhost:8000/cursos?id=${cursoId}`);
		return data;
	}

	if (!isLoading) {
		return (
			<CursoCard
				key={data[0].id}
				id={data[0].id}
				title={data[0].nombreCurso}
				image={data[0].image}
				description={data[0].desc}
				price={data[0].costo}
				teacher={data[0].profesor}
				rating={data[0].calificacion}
				estado={cursoEstado}
			/>
		);
	} else {
		return <LoadingSpinner />;
	}
};

export default Auxiliar;
