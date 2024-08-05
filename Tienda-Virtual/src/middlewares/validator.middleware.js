// Exporta una función llamada validateSchema que toma un esquema como argumento y devuelve un middleware de Express.
// El middleware intenta analizar y validar el cuerpo de la solicitud (req.body) con el esquema proporcionado.
// Si la validación es exitosa, llama a 'next()' para pasar al siguiente middleware o controlador.
// Si ocurre un error durante la validación, devuelve una respuesta de estado 400 (Bad Request) con un array de mensajes de error.

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res
        .status(400)
        .json(error.errors.map((error) => error.message));
    }
};