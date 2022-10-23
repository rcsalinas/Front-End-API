import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Rating } from "@mui/material";

const CursoCard = (props) => {
	const { id, title, image, price, teacher, rating } = props;

	return (
		<Card sx={{ maxWidth: 200, minWidth: 200 }}>
			<CardMedia component="img" height="140" image={`http://localhost:5000/${image}`} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="h6" color="text.secondary">
					{teacher}
				</Typography>
				<Typography variant="h6" color="text.secondary">
					<Rating name="read-only" value={rating} readOnly />
				</Typography>
			</CardContent>
			<CardActions>
				<Typography size="small" gutterBottom variant="p" component="div">
					${price}
				</Typography>
				<NavLink to={`/cursos/${id}`} style={{ textDecoration: "none" }}>
					<Button size="small">Ver detalles</Button>
				</NavLink>
			</CardActions>
		</Card>
	);
};

export default CursoCard;
