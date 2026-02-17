const jwt = require('jsonwebtoken')
const errorUsers = require('../../helpers/errors/users/handleErrorUsers')
const User = require('../../models/user/userModel')

const authUser = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unhautorized.' })
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token no válido. Inicia sesión.' })
    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ message: 'No se ha encontrado el usuario' })
    req.user = user
    next()
  })
}

module.exports = authUser