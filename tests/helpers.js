const request = require('supertest')

async function createTestUser(app) {
    let userToken
    let userLogin

    // 1️⃣ Crear un usuario para obtener el token
    await request(app).post('/users').send({
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

    return {cookie: userLogin.header['set-cookie'], userLogin}
}

module.exports = { createTestUser }