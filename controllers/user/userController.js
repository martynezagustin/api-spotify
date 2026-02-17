const userService = require('../../services/user/userService.js');

const userController = {
  addUser: async function (req, res, next) {
    try {
      const newUser = await userService.addUser(req.body);
      if (newUser.error)
        return res.status(newUser.code).json({ message: newUser.error });
      return res.status(201).json({ message: 'Creado exitosamente.' });
    } catch (error) {
      next(error)
    }
  },
  loginUser: async function (req, res, next) {
    try {
      const { username, password } = req.body
      const request = await userService.loginUser(username, password)
      if (request.error) return res.status(request.code).json({ message: request.error })

      //creamos la cookie
      res.cookie('token', request.token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 86400000
      })

      //devolvemos respuesta al usuario
      return res.status(200).json({ message: 'Login exitoso.', user: request.user })
    } catch (error) {
      next(error)
    }
  },
  getUser: async function (req, res, next) {
    try {
      const {userId} = req.params
      const user = await userService.getUser(userId)
      if (user.error) return res.status(user.code).json({ message: user.error })
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },
  updateUser: async function (req, res, next) {
    try {
      const updatedUser = await userService.updateUser(req.user.id, req.body)
      if (updatedUser.error) return res.status(updatedUser.code).json({ error: updatedUser.error })
      return res.status(200).json({ message: 'Actualización efectuada con éxito.' })
    } catch (error) {
      next(error)
    }
  },
  deleteUser: async function (req, res, next) {
    try {
      const deletedUser = await userService.deleteUser(req.user.id)
      if (deletedUser.error) return res.status(deletedUser.code).json({ message: deletedUser.error })
      return res.status(200).json({ message: deletedUser.error })
    } catch (error) {
      next(error)
    }
  }
};

module.exports = userController;
