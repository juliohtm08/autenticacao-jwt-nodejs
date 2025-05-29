const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
  async GetUserById(id) {
    //chck if user exists
    const user = await User.findById(id, '-password');

    if (!user) {
      throw new Error('usuário não encontrado');
    }

    return user;
  }

  async createUser(name, email, password, confirmPassword) {
    // validations
    if (!name) {
      throw new Error('O nome é obrigatório');
    }

    if (!email) {
      throw new Error('O email obrigatório');
    }

    if (!password) {
      throw new Error('A senha é obrigatório');
    }

    if (password !== confirmPassword) {
      throw new Error('senha inválida');
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new Error('Email já existente');
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }

  async loginUser(email, password) {
    //validations
    if (!email) {
      throw new Error('O email obrigatório');
    }

    if (!password) {
      throw new Error('A senha é obrigatório');
    }

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error('usuário não encontrado');
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error('Senha inválida');
    }

    return user;
  }
}

module.exports = UserService;
