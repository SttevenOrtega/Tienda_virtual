// controllers/contactController.js
import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        if (!name || !phone || !email || !message) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const contact = new Contact({ name, phone, email, message });
        await contact.save();
        res.status(201).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
};
