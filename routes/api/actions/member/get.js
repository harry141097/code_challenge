const MemberModel = require('../../../../model/member')
var Model = new MemberModel
module.exports = function () {
    return function (req, res, next) {
        return Model.getMember(req.body)
            .then(result => {
                res.send({success: true, data: result})
            })
            .catch(function(err){
                return next(err)
            })
    }
}
