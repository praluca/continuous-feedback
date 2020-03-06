import {EventEmitter} from 'fbemitter'
import axios from 'axios'

const SERVER = "http://localhost:3000"

class UserStore {
    constructor(){
        this.users=[]
        this.emitter = new EventEmitter()
    }

    async getAll() {
        try {
            let response = await fetch(`${SERVER}/user-api/users`)
            let data = await response.json()
            this.users = data
            this.emitter.emit('GET_USERS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_USERS_ERROR')
        }
    }

    async addOne(user) {
        try {
            await fetch(`${SERVER}/user-api/users`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
            this.getAll()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_USER_ERROR')
        }
    } 

    async deleteOne(id) {
        try {
            await fetch(`${SERVER}/user-api/users/${id}`, {
                method : 'delete'
            })
            this.getAll()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_USER_ERROR')
        }
    }

    async saveOne(id, user) {
        try {
            await fetch(`${SERVER}/user-api/user/${id}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_USER_ERROR')
        }
    }

    async findOne(user) {
        try {
            await fetch(`${SERVER}/user-api/users/login`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
        } catch(err) {
            console.warn(err)
            this.emitter.emit('FIND_USER_ERROR')
        }
    }
    async register (newUser) {
        return axios
          .post(`${SERVER}/user-api/register`, {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
          })
          .catch(err => {
              console.log(err)
          })
    }
    async login (user) {
        return axios
          .post(`${SERVER}/user-api/login`, {
            email: user.email,
            password: user.password
          })
          .then(response => {
            localStorage.setItem('usertoken', response.data)
            localStorage.setItem('uid', user.id)
            return response.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    
}

export default UserStore