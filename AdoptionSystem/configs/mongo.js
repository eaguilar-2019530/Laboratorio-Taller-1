// Conexión a MongoDB

'use strict'

import mongoose from "mongoose"
import { disconnect } from "process"

export const connect = async()=>{
    try {
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', ()=> console.log('MongoDB | try connection'))
        mongoose.connection.on('connected', ()=> console.log('MongoDB | connected to mongoDB'))
        mongoose.connection.on('open', ()=> console.log('MongoDB | connected to mongoDB'))
        mongoose.connection.on('disconnected', ()=> console.log('MongoDB | disconnect'))
        mongoose.connection.on('reconnected', ()=> console.log('MongoDB | reconnected to mongoDB'))

        return await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV24')
    } catch (err) {
        console.error('Database connection failed', err)
    }
}


