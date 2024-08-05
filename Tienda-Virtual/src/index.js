// ste código en JavaScript sirve para iniciar un servidor web y conectarlo a una base de datos utilizando Node.js y Express

import 'dotenv/config'
import app from './app.js'
import {connectDB} from './db.js'

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
