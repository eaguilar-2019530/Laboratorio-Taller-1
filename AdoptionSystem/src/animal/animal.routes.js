'use strict'

import express from "express"
import { registerAnimal, updateAni, deleteA, TodoAnimal } from "./animal.controller.js"

const api = express.Router()

api.post('/registerAnimal', registerAnimal)
api.put('/updateAni/:id', updateAni)
api.delete('/deleteA/:id', deleteA)
api.get('/TodoAnimal', TodoAnimal)

export default api