const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const userService = new UserService();

class UserController {
  // GET /user/:id
  async findById(req, res) {
    const id = req.params.id;

    const user = await userService.GetUserById(id);

    res.status(200).json({ user });
  }

  // POST /auth/register
  async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const user = await userService.createUser(
      name,
      email,
      password,
      confirmPassword
    );

    try {
      await user.save();

      res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }

  // POST /auth/login
  async login(req, res) {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res
        .status(200)
        .json({ msg: 'autenticação realizada com sucesso', token });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}

module.exports = UserController;
