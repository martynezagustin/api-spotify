const userService = require('../../services/user/userService.js');

const userController = {
  addUser: async function (req, res) {
    try {
      const newUser = await userService.addUser(req.body);
      if (newUser.error)
        return res.status(newUser.code).json({ message: newUser.error });
      return res.status(200).json({ message: 'Creado exitosamente.' });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Ha ocurrido un error de servidor: ${error}` });
    }
  },
};

module.exports = userController;
