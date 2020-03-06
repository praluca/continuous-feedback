'use strict'
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const session = require('express-session')
const models = require('../models')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/verify-token')

router.get('/events/:eid',async(req,res)=>{
    try{
        // if(req.session.user){
            let event = await models.Event.findAll({
                where:{
                    // userId:req.params.eid//req.session.user.id,
                    code:req.params.eid
                }
            })
            res.status(200).json(event)
        // }else{
        //     res.status(404).json({message:"user not logged"})
        // }
    }catch(err){
        res.status(500).json({message:"server error"})
    }
})

router.delete('/events/:eid', auth, async(req,res)=>{
    try{
		let event = await models.Event.findByPk(req.params.eid)
		if (event){
			await event.destroy()
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

router.put('/events/:eid', auth, async(req, res)=>{
    try{
		let event = await models.Event.findByPk(req.params.eid)
		if (event){
			await event.update(req.body)
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

router.post('/events', auth, async(req,res)=>{
    try{
        let event = {
            code : req.body.code,
            title: req.body.title,
            date : new Date(req.body.date),
            theme : req.body.theme,
            userId : req.user.id
        }
        console.log(event)
        await models.Event.create(event)
        res.status(200).json({message:"created"})
    }catch(err){
        res.status(500).json({message:"server error"})
    }
})

router.get('/events', auth, async(req,res)=>{
    await models.Event.findAll({
        where: {
          userId: req.user.id
        }
      }).then(events => {
          if (events) {
            res.json(events)
          } else {
            res.send('No event found')
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message:'server error'})
        })
})

router.get('/events/:uid', async(req,res)=>{
    await models.Event.findAll({
        where: {
          userId: req.params.uid
        }
      }).then(events => {
          if (events) {
            res.json(events)
          } else {
            res.send('No event found')
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message:'server error'})
        })
})
//join an event
router.post('/enter',async(req,res)=>{
    try{
        let event = await models.Event.findOne({
            where :
            {
                code : req.body.code,
                userId : req.session.user.id
            }
        })
        if(event){
            req.session.event_in = event
            res.status(200).json({message:"you entered this event"})
        }else{
            res.status(400).json({message:"no event found"})
        }
    }catch(err){
        res.status(500).json("server error")
    }
})
module.exports = router