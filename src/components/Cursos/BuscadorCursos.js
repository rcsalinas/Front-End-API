import React from "react";
import { useState } from "react";

import Cursos from "./Cursos";
import SearchCursosForm from "./SearchForm";

const cursos_dummy = [
	{ profesor: "hola" },
	{ profesor: "hola" },
	{ profesor: "hola" },
	{ profesor: "hola" },
];

const BuscadorCursos = () => {
	const [cursos, setCursos] = useState(cursos_dummy);

	return (
		<>
			<SearchCursosForm />
			<Cursos cursos={cursos} />
		</>
	);
};

export default BuscadorCursos;
