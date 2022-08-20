import React from "react";
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

const SearchForm = () => {
	const [frecuencia, setFrecuencia] = React.useState("");

	const handleChange = (event) => {
		setFrecuencia(event.target.value);
	};
	const [rating, setRating] = React.useState(2);
	return (
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
					<TextField id="outlined-basic" label="Materia" variant="outlined" />
				</Box>
			</div>

			<div className="form-element">
				<FormControl>
					<FormLabel id="demo-radio-buttons-group-label">Tipo de Clase</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="female"
						name="radio-buttons-group"
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
						onChange={handleChange}
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
						onChange={(event, newRating) => {
							setRating(newRating);
						}}
					/>
				</Box>
			</div>
		</div>
	);
};

export default SearchForm;
