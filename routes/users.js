const {new: _new, create: create} = require('../controllers/usersController');

module.exports = router => {
  // Step 1: Setup the necessary routes for new and create
  router.get('/register', _new);
  router.post('/users', create);
};