import { Rating } from "@mui/material";

const Comentario = (props) => {
	const { imagen, contenido, autor, rating } = props;
	return (
		<div class="row mb-4">
			<div class="col-2">
				<img
					src="https://mdbootstrap.com/img/new/avatars/8.jpg"
					class="img-fluid shadow-1-strong rounded-5"
					alt=""
					style={{ maxWidth: "70%" }}
				/>
			</div>

			<div class="col-10">
				<p class="mb-2">
					<strong>{autor}</strong>
				</p>
				<p>{contenido}</p>
				<Rating name="read-only" value={rating} readOnly />
			</div>
		</div>
	);
};

export default Comentario;
