const {Router} = require('express');
const { loginUser, registerUser } = require('../controllers/userController');
const { githubOAuth, getRepos } = require('../controllers/githubController');

const router = Router();

//User Auth Routes
router.post('/api/user', loginUser);
router.post('/api/register', registerUser);
router.get('/api/oauth/github', githubOAuth);



//Repositories Routes
router.post('/api/github/repos', getRepos);

module.exports = router;