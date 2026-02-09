const bcrypt = require('bcryptjs');
const { UserValidator } = require('../../models/user/userValidator.js');
const jwt = require('jsonwebtoken')
const User = require('../../models/user/userModel.js');
const errorUsers = require('../../helpers/errors/users/handleErrorUsers.js');

const userService = {
  addUser: async function (data) {
    try {
      const { error, value } = UserValidator.validate(data, { abortEarly: false });
      if (error) {
        return { error: error.details[0].message, code: 400 };
      }
      const exists = await User.findOne({
        $or: [{ username: value.username }, { email: value.email }],
      });
      if (exists)
        return {
          error:
            'Ya existe un usuario con datos similares. Intenta con otro e-mail o username.',
          code: 400,
        };

      //2️⃣ hasheamos la pwd
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);

      const newUser = new User({
        ...value,
        password: hashedPassword,
      });
      await newUser.save();
      console.log('Usuario creado con éxito 🟢');
      return newUser._id;
    } catch (err) {
      return { error: err, code: 500 };
    }
  },
  loginUser: async function (username, password) {
    try {
      //1️⃣ el primer paso es que el usuario exista
      const user = await User.findOne({ username })
      if (!user) return errorUsers.userNotFound

      //2️⃣ Hay que ver si la contraseña es correcta
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return { error: 'Contraseña incorrecta. Vuelva a intentarlo.', code: 400 }

      //3️⃣ Crear y firmar token
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

      return { token, user: { _id: user._id } }
    } catch (err) {
      return { error: err, code: 500 };
    }
  },
  getUser: async function (id) {
    try {
      const user = await User.findById(id)
      if (!user) return errorUsers.userNotFound
      return user
    } catch (err) {
      return { error: err, code: 500 };
    }
  },
  updateUser: async function (id, data) {
    try {
      console.log('La data', data)
      const updatedUser = await User.findByIdAndUpdate(id, {...data}, { new: true })
      if (!updatedUser) return errorUsers.userNotFound
      return updatedUser
    } catch (err) {
      console.error(err)
      return { error: err, code: 500 };
    }
  },
  deleteUser: async function (id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) return errorUsers.userNotFound
    } catch (err) {
      return { error: err, code: 500 };
    }
  }
};

module.exports = userService;
