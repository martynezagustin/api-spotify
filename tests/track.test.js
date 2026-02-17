const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const request = require('supertest')

let mongoServer
let userToken
let artistId

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())

    // 1️⃣ Crear un usuario para obtener el token
    await request(app).post('/create-user').send({
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

    //todo track debe ser creado por un artista
    const createArtist = await request(app).post('/create-artist').set('Cookie', userToken).send({
        artistName: 'Test Artist',
        bio: 'This is a test artist bio.',
        genres: ['Trap'],
        geo: {
            city: 'Test City',
            stateOrProvince: 'Test State',
            country: 'Test Country'
        }
    })
    expect(createArtist.statusCode).toBe(201)
    artistId = createArtist.body.artist._id
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
})

describe('Track API endpoints', () => {

    it('should create a new track and get that track in fake DB', async () => {
        const createTrack = await request(app).post('/create-track').set('Cookie', userToken).send({
            title: 'Test Track',
            mainArtist: artistId,
            durationSeconds: 280,
            genre: 'Trap'
        })
        console.log('Track', createTrack.body)
        expect(createTrack.statusCode).toBe(201)

        //deberíamos poder obtener ese track
        const getTrack = await request(app).get(`/tracks/${createTrack.body.track._id}`)
        expect(getTrack.statusCode).toBe(200)

        //ese track debe poder actualizarse
        const update = await request(app).put(`/tracks/${createTrack.body.track._id}`).set('Cookie', userToken).send({
            title: 'Updated Test Track',
            durationSeconds: 300
        })
        expect(update.statusCode).toBe(200)

        //ese track debe poder eliminarse
        const deleted = await request(app).delete(`/tracks/${createTrack.body.track._id}`).set('Cookie', userToken)
        expect(deleted.statusCode).toBe(200)
    })
})