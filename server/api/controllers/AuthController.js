var jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        var params = { email: req.body.user.email, password: req.body.user.password };

        User.create(params).exec((err, user) => {
            if (err) res.serverError(err);
            else res.status(200).json({ success: true })
        });
    },

    login: async (req, res, next) => {
        let user = await User.findOne({ email: req.body.user.email })
        if( !user ) return res.status(422).json('No user has been found.')
        else {
            var token = jwt.sign(user, sails.config.secret.jwt_key);
            return res.status(200).json({ token, user })
        }
    }
}