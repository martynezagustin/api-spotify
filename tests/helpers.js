async function createTestUser(overrides = {}) {
    let userToken
    let userLogin

    // 1️⃣ Crear un usuario para obtener el token
    await request(app).post('/create-user').send({
        name: 'TestName',
        lastname: 'TestLastname',
        email: 'testemail@test.com',
        username: 'test_user',
        password: 'TestPassword123!',
        birthday: '1990-01-01',
        ...overrides
    })

    userLogin = await request(app).post('/login').send({
        username: 'test_user',
        password: 'TestPassword123!'
    })

    return {userLogin, userToken}
}