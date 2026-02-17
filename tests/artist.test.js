const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const request = require('supertest')

let mongoServer
let userToken

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())

    // 1️⃣ Crear un usuario para obtener el token
    const userRegister = await request(app).post('/create-user').send({
        name: 'TestName',
        lastname: 'TestLastname',
        email: 'testemail@test.com',
        username: 'test_user',
        password: 'TestPassword123!',
        birthday: '1990-01-01'
    })

    const userLogin = await request(app).post('/login').send({
        username: 'test_user',
        password: 'TestPassword123!'
    })

    userToken = userLogin.header['set-cookie']
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
})

describe('Artist API endpoints', () => {
    it('should create a new artist and get that profile in fake DB', async () => {
        const res = await request(app).post('/create-artist').set('Cookie', userToken).send({
            artistName: 'Test Artist',
            bio: 'This is a test artist bio.',
            genres: ['Rock'],
            geo: {
                city: 'Test City',
                stateOrProvince: 'Test State',
                country: 'Test Country'
            }
        })

        console.log('El artista creado', res.body.artist)

        const artistId = res.body.artist._id
        expect(res.body).toHaveProperty('message', 'Artista creado con éxito.')
        expect(res.statusCode).toBe(201)


        //acá obtenemos el artista de manera pública  
        const get = await request(app).get(`/artists/${artistId}`)
        expect(get.statusCode).toBe(200) //expectativa de esperar un 200 OK
        expect(get.body).toHaveProperty('artistName', 'Test Artist') //expectativa de que el nombre del artista sea el mismo que el que creamos

        //acá tratamos de actualizar el usuario
        const update = await request(app).put(`/artists/${artistId}`).set('Cookie', userToken).send({
            artistName: 'Updated Test Artist',
            bio: 'This is an updated test artist bio.'
        })
        console.log('El artista actualizado', update.body.updatedArtist)
        expect(update.statusCode).toBe(200)
        expect(update.body).toHaveProperty('message', 'Perfil de artista actualizado con éxito.')

        //acá eliminamos el artista
        const deleted = await request(app).delete(`/artists/${artistId}`).set('Cookie', userToken)
        expect(deleted.statusCode).toBe(200)
        expect(deleted.body).toHaveProperty('message', 'Has eliminado tu perfil de artista con éxito.')
    })
})