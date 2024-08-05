// Importa axios para realizar peticiones HTTP.
// Define la URL base de la API como 'http://localhost:4000/api'.
// Exporta funciones registerRequest y loginRequest para realizar peticiones POST a la API de registro e inicio de sesión respectivamente.
// Utiliza axios para enviar los datos del usuario a las rutas '/register' y '/login' en la API.

import axios from "axios";

const API = "http://localhost:4000/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = user => axios.post(`${API}/login`, user)