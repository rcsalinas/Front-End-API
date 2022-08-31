import React, { useEffect } from "react";
import { useState } from "react";

import Cursos from "./Cursos";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./SearchForm.css";
import { ListItemSecondaryAction } from "@mui/material";

const cursos_dummy = [
	{
		idCurso: "curso1",
		nombreCurso: "Mate101",
		image: "https://www.apwa.net/images/PWM101.jpg",
		profesor: "profesor1",
		desc: "matematicas",
		alumnos: ["alu1", "alu2"],
		duracion: "1 mes",
		frecuencia: "mensual",
		tipo: "grupal",
		costo: 12.99,
		calificacion: 5,
	},
	{
		idCurso: "curso2",
		nombreCurso: "Biology101",
		image: "https://www.apwa.net/images/PWM101.jpg",
		profesor: "profesor2",
		desc: "biologia",
		alumnos: ["alu2"],
		duracion: "2 meses",
		frecuencia: "mensual",
		tipo: "individual",
		costo: 14.99,
		calificacion: 2,
	},
	{
		idCurso: "curso3",
		nombreCurso: "API101",
		image: "https://www.apwa.net/images/PWM101.jpg",
		profesor: "profesor1",
		desc: "Aplicaciones Interactivas",
		alumnos: ["alu1"],
		duracion: "5 dias",
		frecuencia: "semanal",
		tipo: "individual",
		costo: 2.99,
		calificacion: 1,
	},
	{
		idCurso: "curso4",
		nombreCurso: "Statistics101",
		image: "https://www.apwa.net/images/PWM101.jpg",
		profesor: "profesor1",
		desc: "Estadistica",
		alumnos: ["alu2"],
		duracion: "3 meses",
		frecuencia: "semanal",
		tipo: "individual",
		costo: 12.99,
		calificacion: 5,
	},
];

const BuscadorCursos = () => {
	const [cursos, setCursos] = useState([]);
	const [frecuencia, setFrecuencia] = React.useState("");
	const [rating, setRating] = React.useState(null);
	const [searchVal, setSearchVal] = React.useState("");
	const [tipoClase, setTipoClase] = React.useState("");
	const [searchParam, setSearchParam] = useState({
		search: null,
		tipo: null,
		frecuencia: null,
		calificacion: null,
	});

	const handleFrecuenciaChange = (event) => {
		setFrecuencia(event.target.value);
		setSearchParam({
			search: searchVal,
			tipo: tipoClase,
			frecuencia: event.target.value,
			calificacion: rating,
		});
	};
	const handleRatingChange = (event, newRating) => {
		setRating(parseInt(event.target.value));
		setSearchParam({
			search: searchVal,
			tipo: tipoClase,
			frecuencia: frecuencia,
			calificacion: event.target.value,
		});
	};
	const handleSearchChange = (event) => {
		setSearchVal(event.target.value);
		setSearchParam({
			search: event.target.value,
			tipo: tipoClase,
			frecuencia: frecuencia,
			calificacion: rating,
		});
	};
	const handleRadioChange = (event) => {
		setTipoClase(event.target.value);
		setSearchParam({
			search: searchVal,
			tipo: event.target.value,
			frecuencia: frecuencia,
			calificacion: rating,
		});
	};
	useEffect(() => {
		setCursos(cursos_dummy);
	}, []);

	useEffect(() => {
		console.log(searchParam);
	}, [searchParam]);

	function search(items) {
		if (frecuencia === "" && rating === null && searchVal === "" && tipoClase === "") {
			return cursos;
		}
		return items.filter((item) => {
			//tengo que de alguna manera revisar si estan set los params, por el momento solo el search normal funciona
			if (searchVal != "") {
				return item.nombreCurso.toLowerCase().includes(searchVal);
			}
		});
	}
	return (
		<>
			<div className="curso-form">
				<div className="form-element">
					<Box
						component="form"
						sx={{
							"& > :not(style)": { m: 1, width: "25ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="outlined-basic"
							label="Materia"
							variant="outlined"
							onChange={handleSearchChange}
							value={searchVal}
						/>
					</Box>
				</div>

				<div className="form-element">
					<FormControl>
						<FormLabel id="demo-radio-buttons-group-label">Tipo de Clase</FormLabel>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="female"
							name="radio-buttons-group"
							onChange={handleRadioChange}
							value={tipoClase}
						>
							<FormControlLabel
								value="individual"
								control={<Radio />}
								label="Individual"
							/>
							<FormControlLabel value="grupal" control={<Radio />} label="Grupal" />
						</RadioGroup>
					</FormControl>
				</div>
				<div className="form-element">
					<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
						<InputLabel id="demo-select-medium">Frecuencia</InputLabel>
						<Select
							labelId="demo-select-small"
							id="demo-select-small"
							value={frecuencia}
							label="Frecuencia"
							onChange={handleFrecuenciaChange}
						>
							<MenuItem value="unica">Unica</MenuItem>
							<MenuItem value="semanal">Semanal</MenuItem>
							<MenuItem value="mensual">Mensual</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="form-element">
					<Box
						sx={{
							"& > legend": { mt: 2 },
						}}
					>
						<Typography component="legend">Rating</Typography>
						<Rating
							name="simple-controlled"
							value={rating}
							onChange={handleRatingChange}
						/>
					</Box>
				</div>
			</div>

			<Cursos cursos={cursos} search={search} />
			{/*Aqui le paso los cursos encontrados por parametro y ese componente los renderiza*/}
		</>
	);
};

export default BuscadorCursos;
