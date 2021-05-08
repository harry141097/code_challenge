const actions = require('./actions');
var express = require('express')
var router = express.Router();
const Auth = require('../../middleware/auth')

//auth
router.post('/auth/register', actions.register());

router.post('/auth/login', actions.login());
router.use(Auth.isAuth)

//member
router.get('/member/get', actions.getMember());
router.get('/member/get_team_of_member', actions.getTeamOfMember());

module.exports = router
