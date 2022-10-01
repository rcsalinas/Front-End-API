import React, { useState } from "react";
import {
	MDBContainer,
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarToggler,
	MDBNavbarNav,
	MDBNavbarItem,
	MDBNavbarLink,
	MDBCollapse,
} from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

export default function MainNavigation() {
	const [showNav, setShowNav] = useState(false);
	const auth = useContext(AuthContext);

	return (
		<MDBNavbar expand="lg" light bgColor="light">
			<MDBContainer fluid>
				<NavLink to="/" exact style={{ textDecoration: "none" }}>
					<MDBNavbarBrand>TeachersMarket</MDBNavbarBrand>
				</NavLink>

				<MDBNavbarToggler
					type="button"
					aria-expanded="false"
					aria-label="Toggle navigation"
					onClick={() => setShowNav(!showNav)}
				>
					<MDBIcon icon="bars" fas />
				</MDBNavbarToggler>
				<MDBCollapse navbar show={showNav}>
					<MDBNavbarNav>
						<NavLink to={`/${auth.userId}/perfil`}>
							<MDBNavbarItem>
								<MDBNavbarLink active aria-current="page">
									Perfil
								</MDBNavbarLink>
							</MDBNavbarItem>
						</NavLink>

						<NavLink to={`/${auth.userId}/notificaciones`}>
							<MDBNavbarItem>
								<MDBNavbarLink>Notificaciones</MDBNavbarLink>
							</MDBNavbarItem>
						</NavLink>

						{auth.userType === "profesor" && (
							<NavLink to={`/${auth.userId}/contrataciones`}>
								<MDBNavbarItem>
									<MDBNavbarLink>Contrataciones</MDBNavbarLink>
								</MDBNavbarItem>
							</NavLink>
						)}
					</MDBNavbarNav>
					{auth.isLoggedIn && (
						<MDBNavbarItem onClick={auth.logout} className="d-flex input-group w-auto">
							<MDBBtn color="primary">Logout</MDBBtn>
						</MDBNavbarItem>
					)}
					{!auth.isLoggedIn && (
						<NavLink to="/auth">
							<MDBBtn color="primary">Login</MDBBtn>
						</NavLink>
					)}
				</MDBCollapse>
			</MDBContainer>
		</MDBNavbar>
	);
}
