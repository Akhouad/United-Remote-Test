var md5 = require('MD5');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true
    },
    shops: { // preferred shops
      collection: 'shop',
      via: 'users'
    },
    dislikes: {
      type: 'json',
      defaultsTo: { shops: [] }
    }
  },
  customToJSON: function(){
    // do not return password anytime we're calling a User object
    return _.omit(this, ['password'])    
  },
  // hash password before every user creation
  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
};

