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
       },
       place:{
        type: DataTypes.STRING,
        allowNull: false
       },
       description:{
        type: DataTypes.TEXT
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
