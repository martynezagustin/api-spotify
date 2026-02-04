const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const URL = process.env.MONGODB_URI
        if(!URL) throw new Error('URL NOT EXISTS')
        console.log('Conectando a la database...')
        await mongoose.connect(URL)
        console.log('✅ Conectado')
    } catch (error) {
        console.error('Error al conectar a la base de datos', error)
        process.exit(1)
    }
}

module.exports = connectDB