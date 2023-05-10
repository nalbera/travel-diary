const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('entries',{
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
       place:{
        type: DataTypes.STRING,
        allowNull: false
       },
       description:{
        type: DataTypes.TEXT,
        defaultValue: null
       },
       user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
       }
    },
    {
        timestamps: false,
    }
    );
};
