const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('photos',{
       id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
       },
       photo:{
        type: DataTypes.STRING,
        allowNull: false
       },
       entry_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
       }
    },
    {
        timestamps: false,
    }
    );
};