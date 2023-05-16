require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT} = process.env;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DIALECT,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '../models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '../models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Entries, Photos, Users, Votes } = sequelize.models;

Entries.hasMany(Photos, { foreignKey: 'entry_id' });
Photos.belongsTo(Entries, { foreignKey: 'entry_id' });

Entries.hasMany(Votes, { foreignKey: 'entry_id' });
Votes.belongsTo(Entries, { foreignKey: 'entry_id' });

Users.hasMany(Entries, { foreignKey: 'user_id' });
Entries.belongsTo(Users, { foreignKey: 'user_id' });

Users.hasMany(Votes, { foreignKey: 'user_id' });
Votes.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
