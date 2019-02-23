module.exports = {
    index: async (req, res) => {
        // get all shops
        let shops = await Shop.find().sort('distance ASC')
        // get disliked shops IDs
        let disliked = await User.findOne(req.user.id)
        // get current user's preferred shops
        let preferred = await User.findOne(req.user.id).populate('shops')
        
        let excluded_ids = []
        // get disliked shops IDs
        disliked.dislikes.shops.forEach(shop => {
            let disliked_at = new Date(shop.dislikedAt)
            let difference_minutes = ( Date.now() - disliked_at ) / ( 1000 * 60 )

            // exclude shop if it was disliked for less than 2 hours
            if( difference_minutes < 120 ) excluded_ids.push( shop.id )
        })
        
        // save preferred shops' IDs in excluded_ids variable
        preferred.shops.forEach(shop => excluded_ids.push( shop.id ))

        // filter shops by removing user's preferred + disliked shops
        shops = shops.filter(shop => !excluded_ids.includes(shop.id))

        return res.status(200).json(shops)
    },


    // when user likes/dislikes a shop
    react: (req, res) => {
        let shop_id    = req.params.shop_id,
            collection = req.body.collection
        
        // when user hits 'like'
        if( collection == 'shops' ){
            User.addToCollection(req.user.id, collection, shop_id).exec((err, updated) => {
                if( err ) return res.serverError(err)
    
                User.findOne(req.user.id).populate(collection).exec((err, user) => {
                    if( err ) return res.serverError(err)
                    else res.status(200).json(user)
                })
            })
        }

        // when user hits 'dislike'
        if( collection == 'dislikes' ){
            let shop_id = req.params.shop_id

            User.findOne(req.user.id).exec((err, user) => {
                if( err ) return res.serverError(err)
                
                // getting current disliked shops 
                let dislikes = user.dislikes 
                // add this shop to current disliked shops
                dislikes.shops.push({ id: shop_id, dislikedAt: Date.now() }) 
                // update user's disliked shops
                User.update(req.user.id).set({ dislikes }).exec((err, updated) => {
                    return res.status(200).json(user)
                })
            })
        }
    },

    // get user's preferred shops
    preferred: async (req, res) => {
        let user = await User.findOne(req.user.id).populate('shops')
        return res.status(200).json(user.shops)
    },

    // remove a preferred shop
    remove_preferred: (req, res) => {
        let shop_id = req.body.shop_id

        User.removeFromCollection(req.user.id, 'shops', shop_id).exec((err, updated) => {
            if( err ) return res.serverError(err)

            User.findOne(req.user.id).populate('shops').exec((err, user) => {
                if( err ) return res.serverError(err)
                else res.status(200).json(user)
            })
        })
    }
};
