import React from "react";
import { useState, useEffect, useCallback } from "react";

import Cursos from "./Cursos";
import SearchCursosForm from "./SearchForm";

const BuscadorCursos = () => {
	const [cursos, setCursos] = useState([]);

	const handleBuscar = (cursosResultado) => {
		setCursos(cursosResultado);
	};

	return (
		<>
			<SearchCursosForm handleBuscar={handleBuscar} />
			<Cursos cursos={cursos} />
		</>
	);
};

export default BuscadorCursos;
