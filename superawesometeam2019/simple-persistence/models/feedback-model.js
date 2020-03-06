module.exports = (sequelize, DataTypes) => {
    return sequelize.define('feedback', {
        date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        type : {
           type : DataTypes.STRING,
           isIn : [['THE BEST', 'GOOD', 'NORMAL', 'POOR', 'VERY BAD']]
        }
    })
}