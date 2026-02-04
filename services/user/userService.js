const bcrypt = require('bcryptjs');
const { UserValidator } = require('../../models/user/userValidator.js');
const User = require('../../models/user/userModel.js');

const userService = {
  addUser: async function (data) {
    try {
      const { error, value } = UserValidator.validate(data);
      if (error) {
        return { error: error.details[0].message, code: 400 };
      }
      const exists = await User.findOne({
        $or: [{ username: value.username }, { email: value.email }],
      });
      if (exists)
        return {
          error:
            'Ya existe un usuario con datos similares. Cambia tu e-mail o username.',
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
      console.log('Usuario creado con éxito 🟢', newUser);
      return newUser;
    } catch (err) {
      console.error('🔥 Ocurrió un error al crear el usuario', err);
      return { error: err, code: 500 };
    }
  },
  loginUser: async function () {},
  getUser: async function (id) {},
};

module.exports = userService;
