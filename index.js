const server = require('./src/app');
const { conn } = require('./src/database/config/db');
const testConnection = require('./src/database/services/testConnection')

const PORT = process.env.PORT || 3001;

testConnection().then(()=>{
    conn.sync({alter: false}).then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening at ${PORT}`);
        });
    })
});
