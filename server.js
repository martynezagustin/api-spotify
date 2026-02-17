const app = require('./app');
const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 3010

async function startServer(){
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log('Server running on', PORT);  
        })
    } catch (error) {
        console.error('Error al iniciar el server:', error)
        process.exit(1)
    }
}

startServer()