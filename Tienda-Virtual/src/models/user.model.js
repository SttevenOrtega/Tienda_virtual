// Importa mongoose para definir esquemas y modelos para MongoDB.
// Define un esquema de usuario utilizando mongoose.Schema:
//   - 'username': Campo de tipo String requerido y recortado para eliminar espacios en blanco alrededor.
//   - 'email': Campo de tipo String requerido, recortado y único para cada usuario.
//   - 'password': Campo de tipo String requerido para almacenar la contraseña del usuario.
// Configura opciones adicionales para el esquema:
//   - 'timestamps': Habilita la generación automática de campos 'createdAt' y 'updatedAt' para el seguimiento de la fecha de creación y última modificación.
// Exporta un modelo llamado 'User' basado en el esquema definido, que representa la colección 'users' en MongoDB.

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        default: 'user' }
}, {
    timestamps: true
})



export default mongoose.model('User', userSchema)