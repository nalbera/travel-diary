const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users',{
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
       email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
       },
       password:{
        type: DataTypes.STRING,
        allowNull: false
       },
       name:{
        type: DataTypes.STRING,
        defaultValue: null
       },
       avatar:{
        type: DataTypes.STRING,
        defaultValue: null
       },
       active:{
        type: DataTypes.TINYINT,
        defaultValue: 0
       },
       role:{
        type: DataTypes.ENUM('admin','normal'),
        allowNull: false,
        defaultValue: 'normal'
       },
       regCode:{
        type: DataTypes.CHAR(36),
        defaultValue: null
       },
       deleted:{
        type: DataTypes.TINYINT,
        defaultValue: 0
       },
       lastAuthUpdate:{
        type: DataTypes.DATE,
        defaultValue: null
       },
       recoverCode:{
        type: DataTypes.CHAR(36),
        defaultValue: null
       }
    },
    {
        timestamps: false,
    }
    );
};