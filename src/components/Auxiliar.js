import React from "react";

import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import CursoCard from "./Cursos/CursoCard/CursoCard";

const Auxiliar = (props) => {
	const { cursoId } = props;

	const { data, error, isError, isLoading } = useQuery(["curso", cursoId], fetchCursoPorId);

	async function fetchCursoPorId() {
		const { data } = await axios.get(`http://localhost:8000/cursos/${cursoId}`);
		return data;
	}

	if (isError) {
		return <div>Error! {error.message}</div>;
	}

	if (!isLoading) {
		return (
			<CursoCard
				key={data.id}
				id={data.id}
				title={data.nombreCurso}
				image={data.image}
				description={data.desc}
				price={data.costo}
				teacher={data.profesor}
				rating={data.calificacion}
			/>
		);
	} else {
		return <LoadingSpinner />;
	}
};

export default Auxiliar;
