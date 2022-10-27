import { Avatar, Box, Grid, Paper, Rating, Typography } from "@mui/material";

const options = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

const Comentario = (props) => {
	const { alumno, comentario, rating, fecha } = props;

	return (
		<Paper elevation={0} style={{ padding: "20px" }}>
			<Grid container wrap="nowrap" spacing={2}>
				<Grid item>
					<Avatar alt="Remy Sharp" src={`http://localhost:5000/${alumno.image}`} />
				</Grid>
				<Grid justifyContent="left" item xs zeroMinWidth>
					<Typography variant="h6" sx={{ textAlign: "left" }}>
						{alumno.nombre}
					</Typography>
					<Box
						sx={{
							textAlign: "left",
							mt: 1,
							color: "gray",
							display: { xs: "block", md: "flex" },
							alignItems: "center",
						}}
					>
						<Rating sx={{ mr: 1 }} value={rating || 0} readOnly precision={0.5} />
						<div>{new Date(fecha).toLocaleDateString("es", options)}</div>
					</Box>
					<p style={{ textAlign: "left" }}>{comentario}</p>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Comentario;
