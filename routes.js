const { Router } = require('express');
const checkToken = require('./src/middlewares/checkToken');
const UserController = require('./src/controllers/UserController');

const router = Router();

const userController = new UserController();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.get('/user/:id', checkToken, userController.findById);

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'API funcionando!' });
});

module.exports = router;
