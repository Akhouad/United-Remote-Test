var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token
  // check if authorization header exists
  if(req.headers && req.headers.authorization) {
      let parts = req.headers.authorization.split(' ')
      if(parts.length == 2) {
          var scheme = parts[0]
          var credentials = parts[1]
          
          if(/^Bearer$/i.test(scheme)) token = credentials
      }else{
          return res.status(401).json({ err: 'Format is Authorization: Bearer [token]' })
      }
  }else {
      //authorization header is not present
      return res.status(401).json({ err: 'No Authorization header was found' })
  }

  jwt.verify(token, sails.config.secret.jwt_key, (err, decoded) => {
      if(err) return res.status(401).json({ err: 'Invalid token' })
      req.user = decoded;
      next();
	});
};