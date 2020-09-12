const express = require('express');
const router = express.Router();
const { SignupUser, loginUser, getUser } = require('../controller/userController');
const Auth = require('../util/Auth');

const { check } = require('express-validator');

const checkValidation = [
  check('email').isEmail(),
  check("username").isLength({ min: 4 }),
  check("password").isLength({ min: 6 }),
  check("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) return true
    throw new Error('Password confirm does not match password');
  })

]


/* GET users listing. */
router.get('/', Auth, function (req, res, next) {
  console.log(req.user.id)
  res.send('respond with a resource');
});



router.post('/signup', checkValidation, SignupUser);
router.post('/login', checkValidation, loginUser);
router.get('/getuser', Auth, checkValidation, getUser);


module.exports = router;
