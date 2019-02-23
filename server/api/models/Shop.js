module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    image: {
      type: 'string',
      required: true
    },
    distance: {
      type: 'number',
      required: true
    },
    users: { // users who add this shop to their preferred ones
      collection: 'user',
      via: 'shops'
    }
  }
};

