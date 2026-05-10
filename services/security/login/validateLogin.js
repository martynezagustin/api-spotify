const LogginAttempt = require('../../../models/user/security/logginAttemptModel')
const User = require('../../../models/user/userModel')

const validateLogin = {
    attempsToLogin: async function (username, ip, userAgent) {
        try {
            const user = await User.findOne({ username })
            if (!user) {
                await LogginAttempt.create({
                    username,
                    ip,
                    userAgent,
                    success: false
                })

                return { error: 'Credenciales inválidas', code: 400 }
            }
            return await LogginAttempt.create({
                username,
                ip,
                userAgent,
                success: true
            })
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    }
}

module.exports = validateLogin