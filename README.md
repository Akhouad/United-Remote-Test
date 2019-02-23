# United-Remote-Test
United Remote Test using Vue.js + Node.js + Sails.js

### Change MongoDB Credentials in these files :

`server/config/env/production.js line:50`

`server/config/datastores.js line:52`

### Then run these commands
```cd frontend && npm i && npm run serve```

```cd ../server && npm i && nodemon ./app.js```

### Visit: http://localhost:8080/

**Note:** In order to add seeds, edit `overwrite` value to `true` in `server/config/seeds.js`, go to http://localhost:8080/ then put back `overwrite` value to false in seeds file
