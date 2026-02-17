const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const app = require('../app')

let mongoServer
let userToken
let userLogin

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

    userLogin = await request(app).post('/login').send({
        username: 'test_user',
        password: 'TestPassword123!'
    })

    userToken = userLogin.header['set-cookie']
})

describe('Playlist API endpoints', () => {
    it('should create a new playlist and get that playlist in fake DB', async () => {
        const createPlaylist = await request(app).post('/create-playlist').set('Cookie', userToken).send({
            name: 'Test Playlist',
            ownerUser: userLogin.body.user._id,
            isPublic: true
        })
        console.log('La playlist', createPlaylist.body)
        expect(createPlaylist.statusCode).toBe(201)
        expect(createPlaylist.body).toHaveProperty('message', 'Playlist creada con éxito.')

        //gettear la playlist
        const get = await request(app).get(`/playlists/${createPlaylist.body.playlist._id}`)
        expect(get.statusCode).toBe(200)
        expect(get.body).toHaveProperty('name', 'Test Playlist')
    })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
})