module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username : {
            type: DataTypes.STRING,
            allowNull : false,
            validate : {
                len : [3,20]
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            // validate : { 
            //     is : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            // }
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                isEmail : true
            }
        }
    })
}