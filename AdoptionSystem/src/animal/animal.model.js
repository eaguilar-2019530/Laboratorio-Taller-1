import mongoose from "mongoose";
import  name  from "../user/user.model.js"

const animalSchema = mongoose.Schema({
    petName : {
        type: String,
        required: true
    }, 
    petBreed : {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    petDescription: {
        type: String,
        required: true
    },
    name: {
        typeof: String
    }
})

export default mongoose.model('animal', animalSchema)