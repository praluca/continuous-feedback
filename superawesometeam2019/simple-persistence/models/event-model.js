module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
        code : {
            type : DataTypes.STRING,
            allowNull : false,
            isNumeric : true ,
            unique : true 
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false 
        },
        date : {
            type : DataTypes.DATE,
            allowNull : false 
        },
        theme : {
            type : DataTypes.STRING,
            allowNull : false 
        },
        userId : {
            type : DataTypes.INTEGER,
            allowNull : false 
        }
    })
}