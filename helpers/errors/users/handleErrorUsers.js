const errorUsers = {
    userNotFound: {
        error: 'No se ha localizado el usuario.', code: 404
    },
    userNotAuthorized: {
        error: 'Tienes prohibido realizar esta operación.', code: 403
    }
}

module.exports = errorUsers