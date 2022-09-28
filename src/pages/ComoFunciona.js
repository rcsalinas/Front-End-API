import React from "react";
import "./ComoFunciona.css";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

const ComoFunciona = () => {
	const auth = useContext(AuthContext);
	return (
		<>
			<section className="contenedorSection">
				<h2>Preguntas Frecuentes</h2>
				{!auth.isLoggedIn && (
					<>
						<details>
							<summary>QUE ES TEACHERS MARKET</summary>
							<p>Es un sitio web para encontrar clases particulares.</p>
						</details>
						<details>
							<summary>COMO INICIAR SESION</summary>
							<p>Debes ir a la seccion superior derecha y autenticarte</p>
						</details>
						<details>
							<summary>COMO RECUPERAR CONSTRASEÑA</summary>
							<p>
								Accede a la pagina de inicio de sesion y da click a "Forgot
								Password". Sigue las instrucciones
							</p>
						</details>
						<details>
							<summary>AUN TENGO MAS DUDAS</summary>
							<p>Si tienes mas dudas puedes contactarte con nosotros por mail</p>
						</details>
					</>
				)}
				{auth.isLoggedIn && auth.userType === "estudiante" && (
					<>
						<details>
							<summary>COMO INSCRIBIRME A UN CURSO</summary>
							<p>Busca tu curso en la pagina y solicitalo</p>
						</details>
						<details>
							<summary>COMO FINALIZAR UN CURSO</summary>
							<p>
								Entra a tus cursos, da click a ver detalles del curso que quieres
								cancelar y da click a finalizar curso
							</p>
						</details>
						<details>
							<summary>COMO CALIFICAR UN CURSO</summary>
							<p>
								Envia una reseña al profesor desde el curso que quieres calificar.
								El profesor decidira si la reseña es adecuada o no
							</p>
						</details>
						<details>
							<summary>COMO BUSCAR UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
					</>
				)}
				{auth.isLoggedIn && auth.userType === "profesor" && (
					<>
						<details>
							<summary>COMO PUBLICAR UN CURSO</summary>
							<p>
								Ve a tus cursos y da click en crear un curso. Llena el formulario
								con los datos del curso
							</p>
						</details>
						<details>
							<summary>COMO DESPUBLICAR UN CURSO</summary>
							<p>
								Ve a tus cursos, da click a ver detalles del curso que quieras
								despublicar y da click en el boton finalizar curso
							</p>
						</details>
						<details>
							<summary>COMO ELIMINAR UN CURSO</summary>
							<p>
								Ve a tus cursos, da click a ver detalles del curso que quieras
								eliminar y da click en el boton eliminar curso
							</p>
						</details>
						<details>
							<summary>COMO MODIFICAR UN CURSO</summary>
							<p>
								Ve a tus cursos, da click a ver detalles del curso que quieras
								modificar y da click en el boton modificar curso
							</p>
						</details>
					</>
				)}
			</section>
		</>
	);
};

export default ComoFunciona;
