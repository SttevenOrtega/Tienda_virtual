// Importa la función z del módulo 'zod' para definir esquemas de validación de datos.
// Define el esquema registerSchema para validar datos de registro:
//   - 'username' debe ser una cadena requerida con un mensaje de error personalizado si no se proporciona.
//   - 'email' debe ser una cadena requerida que también cumpla con el formato de correo electrónico,
//     con mensajes de error personalizados para requerido y formato inválido.
//   - 'password' debe ser una cadena requerida con al menos 6 caracteres, con un mensaje de error personalizado si no se cumple.
// Define el esquema loginSchema para validar datos de inicio de sesión:
//   - 'email' debe ser una cadena requerida que también cumpla con el formato de correo electrónico,
//     con mensajes de error personalizados para requerido y formato inválido.
//   - 'password' debe ser una cadena requerida con al menos 6 caracteres, con un mensaje de error personalizado si no se cumple.
// Exporta ambos esquemas para su uso en otras partes de la aplicación.

import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
    required_error: "Se requiere un usuario",
    }),
    email: z
    .string({
        required_error: "Se requiere un Email",
    })
    .email({
        message: "El Email no es valido",
    }),
    password: z
    .string({
        required_error: "Se requiere una contraseña",
    })
    .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
        email: z
        .string({
            required_error: "Se requiere un Email",
        })
        .email({
            message: "El Email no es valido",
        }),
        password: z
        .string({
            required_error: "Se requiere contraseña",
        })
        .min(6, {
            message: "La contraseña debe tener al menos 6 caracteres",
        }),
});
