const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const request = require('supertest')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri =mongoServer.getUri()
    await mongoose.disconnect()
    await mongoose.connect(uri)
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
})

describe('User API endpoints', () => {
    it('should create a new user in fake DB', async () => {
        const res = await request(app).post('/create-user').send({
            name: 'Julián',
            lastname: 'Carranza',
            email: 'juliancarranza@example.com',
            username: 'jul_carranza',
            birthday: '1990-03-03',
            password: 'Mugriento123!'
        })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('message', 'Creado exitosamente.')
    })
    it('should login user', async () => {
        const res = await request(app).post('/login').send({
            username: 'jul_carranza',
            password: 'Mugriento123!'
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message', 'Login exitoso.')
    })
    it('should not login user with wrong password', async () => {
        const res = await request(app).post('/login').send({
            username: 'jul_carranza',
            password: 'WrongPassword123!'
        })
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message', 'Usuario o contraseña incorrectos. Vuelva a intentarlo.')
    })
})
