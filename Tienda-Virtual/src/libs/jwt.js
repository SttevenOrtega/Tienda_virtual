// Importa la biblioteca jwt para trabajar con tokens JWT (JSON Web Token).
// Importa TOKEN_SECRET desde el archivo 'config.js' para firmar el token JWT.
// Exporta una función llamada createAccessToken que genera un token de acceso basado en el payload proporcionado.
// Devuelve una promesa que firma el payload con TOKEN_SECRET y configura el token para expirar en 1 día.
// Si se genera correctamente, resuelve la promesa con el token JWT.
// Si hay un error durante la firma del token, rechaza la promesa con el error.

import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
            expiresIn: "1d",
            },
        (err, token) => {
            if (err) reject(err)
                resolve(token)
            }
        );
});
}