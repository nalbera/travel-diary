const server = require('./src/app');
const { conn } = require('./src/database/config/db');


conn.sync({alter: false}).then(() => {
    server.listen(3001, () => {
        console.log('Server listening at 3001');
    });
})
