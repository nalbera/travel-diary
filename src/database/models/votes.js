const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('votes',{
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
       vote:{
        type: DataTypes.TINYINT,
        allowNull: false
       },
       user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
       },
       entry_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
       },
    },
    {
        timestamps: false,
    }
    );
};