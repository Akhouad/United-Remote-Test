module.exports.routes = {
    'POST /api/auth/login': { controller: 'AuthController', action: 'login' },
    'POST /api/auth/register': { controller: 'AuthController', action: 'register' },
    
    'GET /api/shops': 'ShopController.index',
    'GET /api/shops/preferred': 'ShopController.preferred',
    'GET /api/shops/dislikes': 'ShopController.dislikes',
    'DELETE /api/shops/remove_preferred': 'ShopController.remove_preferred',
    'POST /api/shops/:shop_id/react': 'ShopController.react'
};
