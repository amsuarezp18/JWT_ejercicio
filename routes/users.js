var express = require('express');
var router = express.Router();
var [createUser, login] = require('../controllers/user');

/* CREATE user */
router.post('/', async function(req, res, next) {
  const newUser = await createUser(req.body);
  res.send(newUser);
});

router.post('/login', async function(req, res, next) {
  try {
    const authUser = await login(req.body);
    res.send(authUser);
  } catch (error) {
    res.send(403).json({
      success: false,
      message: 'Incorrect username or password'
    })
  }
});

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

module.exports = router;
