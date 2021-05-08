module.exports = {
    //auth
    register: require('./auth/register'),
    login: require('./auth/login'),
    // member
    getMember: require('./member/get'),
    getTeamOfMember: require('./member/get_team_of_member'),

};
