import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(false);

	const [userId, setUserId] = useState(false);
	const [userType, setUserType] = useState(null);

	const login = useCallback((uid, token, tipo) => {
		setToken(token);
		setUserId(uid);
		setUserType(tipo);

		localStorage.setItem(
			"userData",
			JSON.stringify({
				userId: uid,
				token: token,
				userType: tipo,
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);

		setUserId(null);
		setUserType(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (storedData && storedData.token) {
			login(storedData.userId, storedData.token, storedData.userType);
		}
	}, [login]);

	return { token, login, logout, userId, userType };
};
