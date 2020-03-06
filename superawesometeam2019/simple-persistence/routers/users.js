'use strict'
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const session = require('express-session')
const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require('../middleware/verify-token')

router.post('/sync', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		res.status(201).json({message : 'created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

router.post('/users', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await models.User.bulkCreate(req.body)
			res.status(201).json({message : 'created'})
		}
		else{
			await models.User.create(req.body)
			res.status(201).json({message : 'created'})
		}
	}
	catch(e){
		console.warn(e.stack)
		res.status(500).json({message : 'server error'})
	}
})

router.get('/users', async(req,res)=>{
    try{
	let users = await models.User.findAll()
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:"server error"})
    }
})

router.get('/users/:id', async (req, res) => {
	try{
		let user = await models.User.findByPk(req.params.id)
		if (user){
			res.status(200).json(user)
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

router.put('/users/:id', async (req, res) => {
	try{
		let user = await models.User.findByPk(req.params.id)
		if (user){
			await user.update(req.body)
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

router.delete('/users/:id', async (req, res) => {
	try{
		let user = await models.User.findByPk(req.params.id)
		if (user){
			await user.destroy()
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
router.post('/users/login',async(req,res)=>{
	try{
		let user = await models.User.findOne({
			where:{
				username:req.body.username
			}
		})
		if(user){
			if(user.password === req.body.password){
				req.session.user = user
				res.status(200).json({message: "loggedin"})
			}else{
				res.status(400).json({message: "not found"})
			}
		}else{
			res.status(404).json({message:'not found'})
		}
	}catch(err){
		console.log(err)
		res.status(500).json({message:'server error'})
	}
})
router.post('/register', async (req, res) => {
	const userData = {
	  username: req.body.username,
	  password: req.body.password,
	  email: req.body.email
	}
  
	await models.User.findOne({
	  where: {
		email: req.body.email
	  }
	}).then(user => {
		if (!user) {
		  bcrypt.hash(req.body.password, 10, async (err, hash) => {
			userData.password = hash
			await models.User.create(userData)
			  .then(user => {
				res.json({ status: user.email + ' Registered!' })
			  })
			  .catch(err => {
				res.send('error: ' + err)
			  })
		  })
		} else {
		  res.json({ error: 'User already exists' })
		}
	  })
	  .catch(err => {
		console.log(err)
		res.status(500).json({message:'server error'})
	  })
  })

  router.post('/login', async (req, res) => {
	await models.User.findOne({
	  where: {
		email: req.body.email
	  }
	}).then(user => {
		if (user) {
		  if (bcrypt.compareSync(req.body.password, user.password)) {
			let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
			  expiresIn: 1440
			})
			res.header('Authorization', token).send(token)
		  }
		} else {
		  res.status(400).json({ error: 'User does not exist' })
		}
	  })
	  .catch(err => {
		console.log(err)
		res.status(500).json({message:'server error'})
	  })
  })
  router.get('/profile', async (req, res) => {
	let decoded = jwt.verify(req.headers['Authorization'], process.env.SECRET_KEY)
  
	await models.User.findOne({
	  where: {
		id: decoded.id
	  }
	}).then(user => {
		if (user) {
		  res.json(user)
		} else {
		  res.send('User does not exist')
		}
	  })
	  .catch(err => {
		console.log(err)
		res.status(500).json({message:'server error'})
	  })
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
module.exports = router