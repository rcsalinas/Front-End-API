import React from "react";
import "./ComoFunciona.css";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

const ComoFunciona = () => {
	const auth = useContext(AuthContext);
	return (
		<>
			<h1>Como Funciona</h1>
			<p>
				Primero debes registrarte. Despues puedes solicitar un curso y deberas esperar a que
				el profesor te contacte.
			</p>
			<section>
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
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
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
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO FINALIZAR UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO CALIFICAR UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
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
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO DESPUBLICAR UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO ELIMINAR UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO MODIFICAR UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO VER LA CALIFICACION DE UN CURSO</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
					</>
				)}
			</section>
		</>
	);
};

export default ComoFunciona;
