'use strict'
const fs = require('fs')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        dialect : 'mysql',
        define : {
            timestamps : false
        },
        timezone : 'Europe/Bucharest'
    })

let db = {}
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js') {
        let keyName = file.split('.')[0].split('-')[0]
        keyName = keyName[0].toUpperCase() + keyName.slice(1, keyName.length)
        let moduleName = file.split('.')[0]
        db[keyName] = sequelize.import(moduleName) 
    }
})

db.User.hasMany(db.Event)
db.Event.hasMany(db.Feedback)
sequelize.sync() 
module.exports = db