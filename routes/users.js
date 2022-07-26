const express = require('express');
const router = express.Router();
const User = require('../model/User')
const userController = require('../controller/user-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',
  body('name').notEmpty(),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Не используйте обычное слово в качестве пароля!')
    .isLength({ min: 5, max: 20 })
    .matches(/\d/),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Подтверждение пароля не соответствует паролю');
    }
    // Указывает на успех этого синхронного пользовательского валидатора.
    return true;
  }), userController.registration)
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

// const { param } = require('express-validator');
// app.post(
//   '/object/:id',
//   param('id').customSanitizer(value => {
//     return ObjectId(value);
//   }),
//   (req, res) => {
//     // Handle the request
//   },
// );




module.exports = router;
