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
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit unde, voluptas,
				praesentium quidem, porro veniam nam asperiores in necessitatibus recusandae eaque?
				Beatae fugiat voluptate laudantium iste laboriosam doloribus ad neque!
			</p>
			<section>
				<h2>Preguntas Frecuentes</h2>
				{!auth.isLoggedIn && (
					<>
						<details>
							<summary>QUE ES TEACHERS MARKET</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
						</details>
						<details>
							<summary>COMO INICIAR SESION</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
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
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
								quae aspernatur. Quisquam, quae aspernatur. Quisquam, quae
								aspernatur. Quisquam, quae
							</p>
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

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ab ratione
				praesentium voluptatibus voluptatem veniam eum. Iusto, culpa similique. Laboriosam,
				animi earum. Voluptas assumenda aliquam dolore iste eius impedit? Ducimus.
			</p>
			<h3>titulo 3</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, animi accusamus
				perspiciatis voluptates similique blanditiis ipsam commodi? Ab optio aliquam earum
				incidunt. Rerum quia sit dolor sunt assumenda, dolore totam.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt
				consequatur qui ipsam sit nam numquam enim illum explicabo labore quas fugiat, vel
				laboriosam soluta eos dolorem magni, nisi modi!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quam, magni
				excepturi nemo facilis, nisi nostrum voluptates incidunt libero ipsam assumenda
				aperiam! Tempora omnis, tenetur officiis assumenda iusto numquam perferendis?
			</p>
		</>
	);
};

export default ComoFunciona;
