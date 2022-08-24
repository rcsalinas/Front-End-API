import { useState, useContext } from "react";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const MainNavigation = (props) => {
	const auth = useContext(AuthContext);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<NavLink to="/" exact style={{ textDecoration: "none" }}>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							TeachersMarket
						</Typography>
					</NavLink>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to="/u1/cursos" style={{ textDecoration: "none" }}>
									<Typography textAlign="center">Mis Cursos</Typography>
								</NavLink>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<NavLink to="/quienesSomos" style={{ textDecoration: "none" }}>
									<Typography textAlign="center">Quienes Somos</Typography>
								</NavLink>
							</MenuItem>
						</Menu>
					</Box>

					<NavLink to="/" exact style={{ textDecoration: "none" }}>
						<Typography
							variant="h5"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							TeachersMarket
						</Typography>
					</NavLink>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<NavLink to="/u1/cursos" style={{ textDecoration: "none" }}>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Mis Cursos
							</Button>
						</NavLink>
						<NavLink to="/quienesSomos" style={{ textDecoration: "none" }}>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Quienes Somos
							</Button>
						</NavLink>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<NavLink to="/u1/perfil" style={{ textDecoration: "none" }}>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">Perfil</Typography>
								</MenuItem>
							</NavLink>
							<NavLink to="/u1/mensajeria" style={{ textDecoration: "none" }}>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">Mensajeria</Typography>
								</MenuItem>
							</NavLink>
							<NavLink to="/u1/notificaciones" style={{ textDecoration: "none" }}>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">Notificaciones</Typography>
								</MenuItem>
							</NavLink>
							{auth.isLoggedIn && (
								<MenuItem onClick={handleCloseUserMenu}>
									<Button onClick={auth.logout}>Logout</Button>
								</MenuItem>
							)}
							{!auth.isLoggedIn && (
								<NavLink to="/auth" style={{ textDecoration: "none" }}>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">Iniciar Sesion</Typography>
									</MenuItem>
								</NavLink>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default MainNavigation;
