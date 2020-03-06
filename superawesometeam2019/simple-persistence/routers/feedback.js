'use strict'
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')
const session = require('express-session')
//postam un nou feedback pentru evenimentul in care userul a intrat prin /enter
//verificam sa existe un delay de 1 minut pentru fiecare feedback al clientului
router.post('/feedbacks/:eid', async(req,res)=>{
    try{
        let last_feedback = req.body.date
        if(last_feedback){
            let diffMs = (Date.now()-last_feedback)
            let diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000)
            if(diffMins>0){
                last_feedback = Date.now()
                let feedback = {
                    date : Date.now(),
                    type : req.body.type,
                    eventId : req.params.eid
                }
                await models.Feedback.create(feedback)
                res.status(200).json({message:"feedback counted, wait another minute"})
            }else{
                res.status(400).json({message:"you have to wait another minute before you make another vote"})
            }
        }else{
            let feedback = {
                date : Date.now(),
                type : req.body.type,
                eventId : req.params.eid
            }
            await models.Feedback.create(feedback)
            req.session.last_feedback = feedback.date
            res.status(200).json({message:"feedback counted, wait another minute"})
        }
    }catch(err){
        res.status(500).json({message:"server error"})
    }
})
//preluam toate feedbacks pt un anumit eveniment al userului
//trebuie sa fie logat clientul
router.get('/feedbacks/:eid', async(req,res)=>{
    try{
        let event = await models.Event.findOne({
            where:{
                id : req.params.eid
            }
        })
        if(event){
            let feedbacks = await models.Feedback.findAll({
                where:{
                    eventId : event.id
                }
            })
            res.status(200).json(feedbacks)
        }else{
            res.status(400).json({message:"wrong id"})
        }
    }catch(err){
        res.status(500).json({message:"server error"})
    }
})

module.exports = router