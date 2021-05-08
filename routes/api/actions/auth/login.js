const AuthModel = require('../../../../model/auth')
var Model = new AuthModel
module.exports = function () {
    return function (req, res, next) {
        try {
            if (req.body.username && req.body.password) {
                return Model.login(req.body).then(result => {
                        res.send({success: true, data: result})
                    }).catch (err => {
                    return next(err)
                })
            } else {
                throw new Error('Params invalid!')
            }
        } catch (err) {
            return next(err)
        }
    }
}
